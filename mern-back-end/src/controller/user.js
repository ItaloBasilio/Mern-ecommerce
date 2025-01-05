const User = require("../models/user");

exports.signup = async (req, res) => {
    try {
        // Verifica se o usuário já está registrado
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({
                message: "User  already registered",
            });
        }

        // Cria um novo usuário
        const { firstName, lastName, email, password } = req.body;
        const _user = new User({
            firstName,
            lastName,
            email,
            password,
            username: Math.random().toString(),
        });

        // Salva o novo usuário
        const data = await _user.save();

        // Cria um novo objeto com a ordem desejada
        // const responseUser  = {
        //     role: data.role, // Adicione o campo 'role' aqui
        //     _id: data._id,
        //     firstName: data.firstName,
        //     lastName: data.lastName,
        //     email: data.email,
        //     hash_password: data.password, // Certifique-se de que este campo é o correto
        //     username: data.username,
        //     createdAt: data.createdAt,
        //     updatedAt: data.updatedAt,
        //     __v: data.__v,
        // };

        // Retorna a resposta JSON com a mensagem de sucesso e o usuário criado
        return res.status(201).json({
            message: "User  created successfully",
            // user: responseUser ,
        });
    } catch (error) {
        console.error(error); // Log do erro para depuração
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message, // Inclui a mensagem de erro para depuração
        });
    }
};