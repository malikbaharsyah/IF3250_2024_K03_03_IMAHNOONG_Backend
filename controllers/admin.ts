import { db } from "../utils/dbServer"
import { Admin } from "../types/admin"
import bcrypt from "bcryptjs";

export const createAdmin = async (username:string, password:string, email:string): Promise<Admin> => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await db.admin.findUnique({
        where: {
            username
        }
    })
    if (admin) {
        throw new Error('Username already exists');
    }

    return db.admin.create({
        data : {
            username,
            password: hashedPassword,
            isSuperAdmin: false,
            email,
            planetariumId: 1
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

export const getPlanetariumId = async (username:string): Promise<number> => {
    const admin = await db.admin.findUnique({
        where: {
            username
        }
    })
    if (!admin) {
        return 0
    } else {
        return admin.planetariumId
    }
}

export const assignAdmin = async (username:string, planetariumId:number): Promise<void> => {
    await db.admin.update({
        where: {
            username
        },
        data: {
            planetariumId
        }
    })
}

export const getAllAdmins = async (): Promise<string[]> => {
    const admins = await db.admin.findMany({
        select: {
            username: true
        }
    })
    return admins.map(admin => admin.username)
}