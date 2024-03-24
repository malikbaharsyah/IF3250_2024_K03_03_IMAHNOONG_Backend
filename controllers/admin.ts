import { db } from "../utils/dbServer"
import { Admin } from "../types/admin"
import bcrypt from "bcrypt";

export const createAdmin = async (username:string, password:string, email:string): Promise<Admin> => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return db.admin.create({
        data : {
            username,
            password: hashedPassword,
            isSuperAdmin: false,
            email,
            planetariumId: null
        }
    })
}

export const checkAdmin = async (username:string, password:string): Promise<boolean> => {
    if (!username) {
        throw new Error('Username is required');
    }
    const admin = await db.admin.findUnique({
        where: {
            username
        }
    })
    if (!admin) {
        return false
    }
    const match = await bcrypt.compare(password, admin.password)
    return match
}

export const isSuperAdmin = async (username:string): Promise<boolean> => {
    const admin = await db.admin.findUnique({
        where: {
            username
        }
    })
    if (!admin) {
        return false
    } else {
        return admin.isSuperAdmin
    }
}