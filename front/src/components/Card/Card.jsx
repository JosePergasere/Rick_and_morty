import { Link } from "react-router-dom";
import style from "./Card.module.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getFavorites } from "../../redux/actions";
// import getFavorites from "../../redux/actions";

const Card = ({ id, name, gender, species, image, onClose }) => {
  const [isFav, setIsFav] = useState(false); //estado local Fav
  const dispatch = useDispatch();
  const myFavorites = useSelector((state) => state.myFavorites);

  const add_fav = (character) => {
    axios
      .post("http://localhost:3001/rickandmorty/fav", character)
      .then((res) => console.log("ok"));
  };

  const delete_fav = async (id) => {
    await axios.delete(`http://localhost:3001/rickandmorty/fav/${id}`);
    dispatch(getFavorites());
    alert("Eliminado con exito");
  };

  const handleFavorite = () => {
    //Funcion HandleFavorite
    if (isFav) {
      //Setea en false el estado, despacha la funcion Delete_fav pansandole el id del personaje
      setIsFav(false);
      delete_fav(id);
    } else {
      setIsFav(true); //Setea en false el estado, despacha la funcion add_fav pansandole el id del personaje
      add_fav({ id, name, gender, species, image, onClose });
    }
  };

  useEffect(() => {
    myFavorites.forEach((fav) => {
      if (fav.id === id) {
        setIsFav(true);
      }
    });
  }, [myFavorites]);

  return (
    <div className={style.DivCard}>
      <div className={style.ButtonDiv}>
        {isFav ? (
          <button onClick={handleFavorite} className={style.buttonFav}>
            ❤️
          </button>
        ) : (
          <button onClick={handleFavorite} className={style.buttonFav}>
            🤍
          </button>
        )}
        <button className={style.Button} onClick={() => onClose(id)}>
          X
        </button>
      </div>
      <Link to={`/detail/${id}`}>
        <h2>{name}</h2>
      </Link>

      <img className={style.img} src={image} alt="" />
      <div className={style.TextDiv}>
        <h2>{species}</h2>
        <h2>{gender}</h2>
      </div>
    </div>
  );
};

export default Card;

// class Card extends React.Component {
//    constructor(props) {
//       super(props)
//    }

//    render() {
//       return (
//          <div className={style.DivCard}>

//             <div className={style.ButtonDiv}>
//                {
//                   isFav ? (
//                      <button onClick={handleFavorite}>❤️</button>
//                   ) : (
//                      <button onClick={handleFavorite}>🤍</button>
//                   )
//                }
//                <button className={style.Button} onClick={() => this.props.onClose(this.props.id)}>X</button>
//             </div>
//             <Link to={`/detail/${this.props.id}`}>
//                <h2>{this.props.name}</h2>
//             </Link>

//             <img className={style.img} src={this.props.image} alt="" />
//             <div className={style.TextDiv}>
//                <h2>{this.props.species}</h2>
//                <h2>{this.props.gender}</h2>
//             </div>
//          </div>
//       )
//    }

// };

// const [isFav, setIsFav] = useState(false);

// const add_fav = () =>{
// axios.post("http://localhost:3001/rickandmorty/fav",character)
//};
// const handleFavorite = () => {
//    if (isFav) {
//       setIsFav(false)
//       props.delete_fav(props.character.id);
//    } else {
//       setIsFav(true)
//       props.add_fav(props.character.id);
//    }

// }

// const mapDispatchToProps = (dispatch) => {
//    return {
//
//       delete_fav: (id) => {
//          dispatch(delete_fav(id));
//       },
//    }
// }
// const mapStateToProps = state =>
// return{
//    myFavorites: state.myFavorites
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Card)
