/**
 * @jest-environment node
 */
import {createTuit, deleteTuit, deleteTuitByContent, findAllTuits, findTuitById} from "../services/tuits-service";
import {deleteUsersByUsername, findUserById, createUser, findAllUsers} from "../services/users-service"
import tuit from "../components/tuits/tuit";
// import {createUser} from "./services";
// import axios from "axios";
// axios.defaults.adapter = require('axios/lib/adapters/http');

describe('can create tuit with REST API', () => {
    //   let testid;
    const user1 ={
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'

    };
    const tuit1 = {
        tuit: "tuittest1",
        // postedBy: user1,
        postedOn: "2022-03-22T00:00:00.000Z",

    };
    beforeAll(() => {

        let promises = []
        promises.push(deleteTuitByContent(tuit1.tuit));
        promises.push(deleteUsersByUsername(user1.username));
        return Promise.all(promises);
        //this won't work everytime!! need to return Promise.all to wait for every
        // function's callback
        // deleteTuitByContent(tuit1.tuit);
        // deleteUsersByUsername(user1.username);
        // return;

    });

    afterAll(() => {
        let promises = []
        promises.push(deleteTuitByContent(tuit1.tuit));
        promises.push(deleteUsersByUsername(user1.username));
        return Promise.all(promises);
    });

    test('can insert with REST API', async () => {

        try {
            //console.log("hello2");
            const newUser = await createUser(user1);
            // console.log(newUser);
            const newTuit = await createTuit(newUser._id, tuit1);
            // console.log(newTuit);

            expect(newTuit.tuit)
                .toEqual(tuit1.tuit);
            expect(newTuit.postedBy)
                .toEqual(newUser._id);
            expect(newTuit.postedOn)
                .toEqual(tuit1.postedOn);
        } catch (err) {
            // console.log("error !");
            // console.log(err);
            expect(err).toEqual(new Error());
        }
    });



});

describe('can delete tuit wtih REST API', () => {

    const tuit1 = {
        tuit: "tuittest2delete",
        // postedBy: "61ff40a69267a798690c7e4a",
        postedOn: "2022-03-22T00:00:00.000Z",

    };

    beforeAll(() => {
        return createTuit("61ff40a69267a798690c7e4a", tuit1);
    });

    afterAll(() => {

        return deleteTuitByContent(tuit1.tuit);
    });

    test('can delete tuit wtih REST API', async () => {

        // console.log(await findAllTuits());
        const status = await deleteTuitByContent(tuit1.tuit);

        // verify we deleted at least one user by their username
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
        // await deleteUsersByUsername(user1.username);
    });

});

describe('can retrieve a tuit by their primary key with REST API', () => {
    //   let testid;
    const user_test ={
        username: 'userTest3findTuitId',
        password: 'lv426',
        email: 'ellenripley@aliens.com'

    };
    const tuit_test = {
        tuit: "tuittest3findTuitId",
        // postedBy: user_test,
        postedOn: "2022-03-22T00:00:00.000Z",

    };
    beforeAll(() => {
        let promises = []
        promises.push(deleteTuitByContent(tuit_test.tuit));
        promises.push(deleteUsersByUsername(user_test.username));
        return Promise.all(promises);
        // deleteTuitByContent(tuit_test.tuit);
        // return deleteUsersByUsername(user_test.username);

    });

    afterAll(() => {
        let promises = []
        promises.push(deleteTuitByContent(tuit_test.tuit));
        promises.push(deleteUsersByUsername(user_test.username));
        return Promise.all(promises);
        // deleteTuitByContent(tuit_test.tuit);
        // deleteUsersByUsername(user_test.username);
        // return;
    });

    test('can delete tuit wtih REST API', async () => {
        // insert the user in the database
        const newUser = await createUser(user_test);
        const newTuit = await createTuit(newUser._id, tuit_test);
        // verify new tuit matches the parameter tuit
        // console.log(newUser);
        // console.log(newTuit);
        expect(newTuit.tuit).toEqual(tuit_test.tuit);
        expect(newTuit.postedBy).toEqual(newUser._id);
        expect(newTuit.postedOn).toEqual(tuit_test.postedOn);

        // retrieve the user from the database by its primary key
        const existingTuit = await findTuitById(newTuit._id);
        // console.log(existingTuit);
        // verify retrieved tuit matches parameter tuit
        expect(existingTuit.tuit).toEqual(tuit_test.tuit);
        expect(existingTuit.postedBy).toEqual(newUser);
        expect(existingTuit.postedOn).toEqual(tuit_test.postedOn);

        // await deleteUsersByUsername(user_test.username);
    });
});

describe('can retrieve all tuits with REST API', () => {
    // sample users we'll insert to then retrieve
    const tuitContents = [
        "tuit1Ins", "tuit2Ins", "tuit3Ins"
    ];

    // setup data before test
    beforeAll(() =>
        // insert several known users

        tuitContents.map(tuit =>
            createTuit("61ff40a69267a798690c7e4a",{

                tuit: `${tuit}123`,
                postedOn: "2022-03-10T00:00:00.000Z"

            })
        )

    );

    // clean up after ourselves
    afterAll(() =>
        // delete the users we inserted
        tuitContents.map(tuit =>
            deleteTuitByContent(tuit+"123")
        )
    );

    test('can retrieve all tuits with REST API', async () => {
        // retrieve all the users
        // console.log("here");
        // console.log("here2");
        const users = await findAllUsers();
        // console.log(users);
        const tuits = await findAllTuits();
        // console.log(tuits);
        // there should be a minimum number of users
        expect(tuits.length).toBeGreaterThanOrEqual(tuitContents.length);

        // let's check each tuit we inserted
        const tuitsWeInserted = tuits.filter(
            tuit => tuitContents.indexOf(tuit.tuit) >= 0);

        // compare the actual tuits in database with the ones we sent
        tuitsWeInserted.forEach(tuit => {
            const tuitContent = tuitContents.find(tuitContent => tuitContent === tuit.tuit);
            expect(tuit.tuit).toEqual(`${tuitContent}123`);
            expect(tuit.postedBy).toEqual(`61ff40a69267a798690c7e4a`);
            expect(tuit.postedOn).toEqual(`2022-03-10T00:00:00.000Z`);
        });
    });
});