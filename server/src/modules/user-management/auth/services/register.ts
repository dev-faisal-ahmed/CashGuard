import mongoose from 'mongoose';
import { AppError } from '../../../../utils/app-error';
import { UserModel } from '../../user/user.model';
import { AuthModel } from '../auth.model';
import { AgentModel } from '../../agent/agent.model';
import { AdminModel } from '../../admin/admin.model';
import { UserRoleConstants } from '../../user.constant';
import { RoleType, UserStatusType } from '../auth.interface';
import { CreateAccountValidationSchemaType } from '../auth.validation';

export const Register = async (payload: CreateAccountValidationSchemaType) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //  creating user in auth collection
    const { role } = payload;
    const status: UserStatusType =
      (role as RoleType) === 'USER' ? 'APPROVED' : 'PENDING';

    const [userFormAuthCollection] = await AuthModel.create(
      [{ ...payload, status }],
      { session }
    );

    if (!userFormAuthCollection)
      throw new AppError('Can not crete user into the auth collection', 400);

    const { _id } = userFormAuthCollection.toObject();

    // creating user to user-collection
    if ((role as RoleType) === 'USER') {
      const [userFromUserCollection] = await UserModel.create(
        [{ user: _id, balance: 40, role: 'USER' }],
        { session }
      );

      if (!userFromUserCollection)
        throw new AppError('Can not crete user into the user collection', 400);

      // now updating total money into the db
      const updateAdminInfo = await AdminModel.updateOne(
        { role: UserRoleConstants.ADMIN },
        { $inc: { totalMoney: 40 } },
        { session }
      );

      // check if total money is updated or not
      if (!updateAdminInfo)
        throw new AppError(
          'Total Money is not updated after bonus added to user',
          400
        );
    }

    // creating user to agent-collection
    else if ((role as RoleType) === 'AGENT') {
      const [userFromAgentCollection] = await AgentModel.create(
        [{ user: _id, role: UserRoleConstants.AGENT }],
        { session }
      );

      if (!userFromAgentCollection)
        throw new AppError('Can not crete user into the agent collection', 400);
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();

    console.log(error);

    if (error instanceof AppError)
      throw new AppError(error.message, error.status);
    else throw new AppError('User can not be created', 400);
  }
};
