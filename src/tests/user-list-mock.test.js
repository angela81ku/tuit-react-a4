import {UserList} from "../components/profile/user-list";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllUsers} from "../services/users-service";
import axios from "axios";
import {findAllTuits} from "../services/tuits-service";

jest.mock('axios');

const MOCKED_USERS = [
    {username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com', _id: "123"},
    {username: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com', _id: "234"},
]

test('user list renders mocked', async () => {
    // jest.mock('axios');
    axios.get.mockImplementation(() =>
        Promise.resolve({ data: {users: MOCKED_USERS} }));
    // the function below can put any other function, it doesn't matter...
    const response = await findAllUsers();
    const users = response.users;

    render(
        <HashRouter>
            <UserList users={users}/>
        </HashRouter>);

    const user = screen.getByText(/ellen_ripley/i);
    expect(user).toBeInTheDocument();
    const user2 = screen.getByText(/sarah/i);
    expect(user2).toBeInTheDocument();
});