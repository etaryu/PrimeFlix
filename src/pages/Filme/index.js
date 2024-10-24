import {useEffect,useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Filme-info.css';
import { toast } from 'react-toastify';

import api from '../../services/api';

function Filme(){
    const {id} = useParams();
    const [filme, setFilme]= useState({});
    const [loading, setLoading] = useState(true);
    const navigation = useNavigate();

    useEffect(()=>{
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "daf6254b45484c980420774824307a34",
                    language: "pt-BR",
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                console.log("não encontrado");
                navigation("/", { replace:true});
            })
        }
        loadFilme();



    }, [navigation, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) ||  [];

        const hasFilme = filmesSalvos.some((filmesSalvos)=> filmesSalvos.id === filme.id) // retorna bool
        
        if(hasFilme){
           toast.warn("Esse filme ja foi adicionado!");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso!");

    }


    if(loading){
        return(
            <div className='filme-info'>
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original${filme.backdrop_path}`} alt={filme.title}/>

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliação: {filme.vote_average}/10</strong>

            <div className='area-buttons'>
                <button onClick={salvarFilme} >Salvar</button>
                <button><a target="blank" rel="external"  href={`https://youtube.com/results?search_query=${filme.title} trailer`} >Trailer</a></button>
            </div>
        </div>
    )
}

export default Filme;