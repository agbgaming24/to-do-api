import bcrypt from 'bcrypt';
import generateJWT from '../utils/generateToken.js';
import pool from '../model/db.js';

export const signup=async (req,res)=>{
    try{
        const{name,email,password}=req.body;
        const hashed=await bcrypt.hash(password,10);
        const [result]=await pool.execute(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',[name,email,hashed]
        )
        res.status(201).json({message:"user created"})
    }catch(err){
        res.status(500).json({ message: err.message });
    }
}

export const login=async (req,res)=>{
    try{
        const{email,password}=req.body;
        const [row]=await pool.execute('select * from users where email=?',[email])
        if(row.length<1){
            return res.status(404).json({message:'user not found'})
        }
        const check=await bcrypt.compare(password,row[0].password);
        if(!check){
            return res.status(401).json({message:'user not authorized'});
        }
        const token=generateJWT(row[0]);
        return res.status(200).json({ 
            token,
            user: {
                id: row[0].id,
                name: row[0].name,
                email: row[0].email,
            }
                });
    }catch(err){
        res.status(500).json({ message: err.message });
    }
}