import { Link } from "react-router-dom";
import './Erro.css';


function Erro(){
    return(
        <div className="not-found">
            <h1>404</h1>
            <h1>Essa pagina não encontrada!</h1>
            <Link to="/">Veja todos os Filmes!</Link>
        </div>
    )
}

export default Erro;