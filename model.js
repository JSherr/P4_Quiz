
const Sequelize = require('sequelize'); // cargo el modulo Sequelize

/**
Genero una instancia de sequelize para acceder a una BBDD que esta en el
fichero indicado.
*/
const sequelize = new Sequelize("sqlite:quizzes.sqlite", {logging: false});

/**
Cada vez que defino un modelo dentro de sequelize se crea un array que
se llama "models" donde estan todos los modelos definidos. Por eso no es 
necesario asignarlo a una variable.
*/
sequelize.define('quiz' , {
    question: {
        type: Sequelize.STRING,
        unique: {msg: "Ya existe esta pregunta"},
        validate: {notEmpty: {msg: "La pregunta no puede estar vacía"}}
    },
    answer: {
        type: Sequelize.STRING,
        validate: {notEmpty: {msg: "La respuesta no puede estar vacía"}}
    }
});

/**
Ahora vamos a sincronizar, es decir, mirar si en la BBDD existen las tablas
que necesito. En caso de que no existan, se crearan.
Una vez terminada la sincronizacion, que es una promesa, se ejecuta el "then".
En caso  de que "count" sea cero, creamos varios quizzes mediante la funcion 
"bulkCreate".
*/
sequelize.sync()
.then(() => sequelize.models.quiz.count())
.then(count => {
    if (!count) {
        return sequelize.models.quiz.bulkCreate([
            { question: "Capital de Italia",    answer: "Roma" },
            { question: "Capital de Francia",   answer: "París" },
            { question: "Capital de España",    answer: "Madrid" },
            { question: "Capital de Portugal",  answer: "Lisboa" }
            ]);
    }
})
.catch(error => {
    console.log(error);
});

module.exports = sequelize;