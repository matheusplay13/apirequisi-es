const express= require ('express' );
const app = express();
const port = 3000;

app.use(express.json());
app.get('/saudacao',(req,res)=>{

    const nome= req.query.nome;
    if(!nome){
        return res.status(400).send('Nome é obrigatório');
             }
             res.json({
                 mensagem: `Olá, ${nome}!`
             });
});

app.post("/imc",(req, res)=>{
    const {nome, idade, peso, altura} = req.body;
    if(!nome || !idade || !peso || !altura){
        return res.status(400).json({erro :"Dados incompletos"

        });
    }

    const imc =peso/(altura * altura);
    res.json ({

        
        altura,
        imc
    })
    
});

app.post("/media", (req, res) => {
    const {nome, nota1, nota2} = req.body;
    if(!nome || !nota1 || !nota2){
        return res.status(400).json({erro: "Nome e ambas as notas são obrigatórias"});
    }
    
    const media = (nota1 + nota2) / 2;
    const aprovado = media >= 7;
    
    res.json({
        nome,
        nota1,
        nota2,
        media,
        status: aprovado ? "Aprovado" : "Reprovado"
    });
});

app.post("/alistamento", (req, res) =>{
    const {nome, idade, sexo} = req.body;
    if(!nome || !idade || !sexo){
        return res.status(400).json({erro: "Nome, idade e sexo são obrigatórios"});
    }
    
    if (sexo.toLowerCase() === "m" && idade < 18) {
        return res.status(400).json({erro: "Você precisa ter 18 anos ou mais para se alistar"});
    }
 
  if (sexo.toLowerCase() === "m" && idade >= 18) {
        return res.status(400).json({erro: "alistamento concluido"});
    }
    if (sexo.toLowerCase() === "f" && idade >= 18) {
        return res.status(400).json({erro: "busque um curso preparativo"});
    }
    
    const podeAlistar = idade >= 18 && (sexo.toLowerCase() === "masculino" || sexo.toLowerCase() === "feminino");
     
    
    res.json({
        nome,
        idade,
        sexo,
        status: podeAlistar ? "Pode se alistar" : "Não pode se alistar"
    });


})
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});






