import mongoose from 'mongoose';
import { AdminModel } from '../modules/user-management/admin/admin.model';
import { AuthModel } from '../modules/user-management/auth/auth.model';
import { AppError } from '../utils/app-error';
import { adminEmail, adminPassword } from '../config/config';

export async function SeedAdmin() {
  /*  this function will try to create admin 
    whenever it get's connected to the database by looking 
    if any admin exist or not
*/
  const isAdminExist = await AuthModel.findOne({ role: 'ADMIN' });

  if (!isAdminExist) {
    const session = await mongoose.startSession();
    // creating new admin
    try {
      session.startTransaction();

      //  creating admin in auth-collection
      const [adminInAuthCollection] = await AuthModel.create(
        [
          {
            email: adminEmail,
            role: 'ADMIN',
            status: 'APPROVED',
            name: 'Admin-CashGuard',
            pin: adminPassword,
          },
        ],
        { session }
      );

      // if admin is not created in auth collection
      if (!adminInAuthCollection)
        throw new AppError('Failed insert admin into auth collection', 400);

      // creating admin in admin collection
      const { _id } = adminInAuthCollection.toObject();
      const [adminInAdminCollection] = await AdminModel.create(
        [{ balance: 0, totalMoney: 0, user: _id, role: 'ADMIN' }],
        { session }
      );

      if (!adminInAdminCollection)
        throw new AppError('Failed to insert admin into admin collection', 400);

      await session.commitTransaction();
      await session.endSession();
      console.log('Admin Created');
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      console.log(error);

      if (error instanceof AppError)
        throw new AppError(error.message, error.status);
      else throw new AppError('Failed to create admin', 400);
    }
  }
}
