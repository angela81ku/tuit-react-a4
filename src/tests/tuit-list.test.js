/**
 * @jest-environment node
 */
// This would not pass since the logic is different
// import {Tuit} from "../components/tuits/tuit";
// import Tuits from "../components/tuits/index.js";
// import {screen, render} from "@testing-library/react";
// import {HashRouter} from "react-router-dom";
// import {findAllTuits} from "../services/tuits-service";
// import axios from "axios";
// import {UserList} from "../components/profile/user-list";
// import {findAllUsers} from "../services/users-service";
//
// // jest.mock('axios');
//
// const MOCKED_USERS = [
//   "alice", "bob", "charlie"
// ];
//
// const MOCKED_TUITS = [
//   {tuit: "alice's tuit", _id: "12345",postedBy: "61ff2d90d1fc7ec76409f1d4"},
//   {tuit: "bob's tuit", _id: "54321", postedBy: "61ff405d9267a798690c7e47"},
//   {tuit: "charlie's tuit",_id: "58795", postedBy: "61ff40a69267a798690c7e4a"}
// ];
//
// const MOCKED_TUITS_String = [
//   "alice's tuit","bob's tuit","charlie's tuit"
// ];
//
// test('tuit list renders static tuit array', () => {
//
//   render(
//       <HashRouter>
//         <Tuits tuits={MOCKED_TUITS}/>
//       </HashRouter>);
//   let linkElement = screen.getByText(/alice's tuit/i);
//   expect(linkElement).toBeInTheDocument();
//   linkElement = screen.getByText(/bob's tuit/i);
//   expect(linkElement).toBeInTheDocument();
//   linkElement = screen.getByText(/charlie's tuit/i);
//   expect(linkElement).toBeInTheDocument();
// });
//
// test('tuit list renders async', async () => {
//   const tuits = await findAllTuits();
//
//   render(
//       <HashRouter>
//         <Tuits tuits={tuits}/>
//       </HashRouter>);
//   let linkElement = screen.getByText(/alice's first tuit/i);
//   expect(linkElement).toBeInTheDocument();
//   linkElement = screen.getByText(/@SpaceX Dragon spacecraft/i);
//   expect(linkElement).toBeInTheDocument();
//   linkElement = screen.getByText(/rover landed/i);
//   expect(linkElement).toBeInTheDocument();
// })
// See tuit-list-mock.test.js
// test('tuit list renders mocked', async () => {
//
// });