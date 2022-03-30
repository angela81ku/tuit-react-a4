import React, {useEffect} from "react";
import * as service from "../../services/likes-service";
import * as dis_service from "../../services/dislikes-service";
const TuitStats = ({tuit, likeTuit = () => {},dislikeTuit = () => {}}) => {
    // // useEffect()
    // const userAlreadyLikedTuit = () =>
    //     service.findAllTuitsLikedByUser("me")
    //         .then((tuits) => setLikedTuis(tuits));
    // const userAlreadyDislikedTuit = false
    // const findTuitsILike = () =>
    //     service.findAllTuitsLikedByUser("me")
    //         .then((tuits) => {
    //             tuits.stats.likedByMe = true
    //             tuits.stats.dislikedByMe = false
    //         });
    // const findTuitsIDislike = () =>
    //     dis_service.findAllTuitsDislikedByUser("me")
    //         .then((tuits) => {
    //             tuits.stats.dislikedByMe = true
    //             tuits.stats.likedByMe = false
    //         });
    //
    // useEffect(()=>{
    //     findTuitsILike()
    //     findTuitsIDislike()
    //     }, []);
    return (
      <div className="row mt-2">
        <div className="col">
          <i className="far fa-message me-1"></i>
          {tuit.stats && tuit.stats.replies}
        </div>
        <div className="col">
          <i className="far fa-retweet me-1"></i>
          {tuit.stats && tuit.stats.retuits}
        </div>
        <div className="col">
          <span onClick={() => likeTuit(tuit)}>
              {
                tuit.stats && tuit.stats.likedByMe === true &&
                  <i className="fa-solid fa-thumbs-up"></i>
              }
              {
                tuit.stats  && tuit.stats.likedByMe === false&&
                  <i className="fa-regular fa-thumbs-up"></i>
              }
            {tuit.stats && tuit.stats.likes}
              {/*{JSON.stringify(tuit.stats.likedByme)}*/}
          </span>
        </div>
          <div className="col">
              <span onClick={() => dislikeTuit(tuit)}>
                  {
                      tuit.stats &&  tuit.stats.dislikedByMe === true &&
                      <i className="fa-solid fa-thumbs-down"></i>
                  }
                  {
                      tuit.stats && tuit.stats.dislikedByMe === false &&
                      <i className="fa-regular fa-thumbs-down"></i>
                  }
                  {tuit.stats && tuit.stats.dislikes}
              </span>
          </div>
        <div className="col">
          <i className="far fa-inbox-out"></i>
        </div>
      </div>
    );
}
export default TuitStats;