import pool from '../model/db.js'

export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    const [result]=await pool.execute(
      'INSERT INTO todos (title, description, user_id) VALUES (?, ?, ?)',
      [title, description, req.user.id]  
    );

    res.status(201).json({
      id: result.insertId,
      title,
      description
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTodo=async (req,res)=>{
    try{
        const [rows]=await pool.execute('select * from todos where id=?',[req.params.id])
        if(rows.length<1){
            return res.status(404).json({message:"list item not found"})
        }
        if(rows[0].user_id!=req.user.id){
            return res.status(403).json({message:"forbidden"})
        }
        const{title,description}=req.body;
        await pool.execute('update todos set title=?,description=? where id=?',[title,description,req.params.id])
        res.status(200).json({ id: parseInt(req.params.id), title, description });
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

export const deleteTodo=async (req,res)=>{
    try{
        const [rows]=await pool.execute('select * from todos where id=?',[req.params.id]);
        if(rows.length<1){
            return res.status(404).json({message:'Item not found'})
        }
        if(rows[0].user_id!=req.user.id){
            return res.status(403).json({message:"not authorized"})
        }
        await pool.execute('delete from todos where id=?',[req.params.id])
        return res.status(204).send();
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

export const getTodo=async (req,res)=>{
    try{
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const offset=(page-1)*limit;
        const [rows] = await pool.execute(
        `SELECT * FROM todos WHERE user_id = ? LIMIT ${limit} OFFSET ${offset}`,
        [req.user.id]
        );

        const [[{ total }]] = await pool.execute(
        'SELECT COUNT(*) as total FROM todos WHERE user_id = ?',
        [req.user.id]
        );
        res.status(200).json({data:rows,page:page,limit:limit,total:total})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}