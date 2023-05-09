import React, { useState } from "react";
import {render, fireEvent, getAllByText, act, findByTestId, getAllByLabelText} from '@testing-library/react';
import './App.js';
import Movies from "./pages/Movies";
import {BrowserRouter} from 'react-router-dom';

const mockMovieDetails = [
    {
        tutorialId: 1,
        movieDbId: 123,
        picture: "https://example.com/picture1.jpg",
        title: "Movie 1",
        plot: "Lorem ipsum dolor sit amet",
        genre: "Action",
        studio: "Studio 1",
        actors: "Actor 1, Actor 2",
    },
    // {
    //     tutorialId: 2,
    //     movieDbId: 456,
    //     picture: "https://example.com/picture2.jpg",
    //     title: "Movie 2",
    //     plot: "Lorem ipsum dolor sit amet",
    //     genre: "Comedy",
    //     studio: "Studio 2",
    //     actors: "Actor 3, Actor 4",
    // },
];

const mockMovieList = [
    {
        listId: 1,
        listName: 'My List',
        publicList: true,
        user: {
            id: 1,
            email: 'john_doe@example.com',
            password: 'Password1!'
        },
        movies: [
            {
                tutorialId: 1,
                movieDbId: 123,
                picture: 'https://example.com/image.jpg',
                title: 'Movie Title',
                plot: 'Movie Plot',
                genre: 'Action',
                studio: 'Movie Studio',
                actors: 'Actor 1, Actor 2'
            }
        ]
    },
];

const mockMovieListTwo = [
    {
        listId: 2,
        listName: 'My List',
        publicList: true,
        user: {
            id: 1,
            email: 'john_doe@example.com',
            password: 'Password1!'
        },
        movies: [
            {
                tutorialId: 1,
                movieDbId: 123,
                picture: 'https://example.com/image.jpg',
                title: 'Movie Title',
                plot: 'Movie Plot',
                genre: 'Action',
                studio: 'Movie Studio',
                actors: 'Actor 1, Actor 2'
            }
        ]
    },
];

describe('Movies component', () => {
    beforeAll(() => {
        jest.spyOn(window, 'fetch');
    });

    beforeEach(() => {
        window.fetch.mockClear();
    });

    it('should render the component', async () => {

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieDetails,
            status: 200
        });

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieList,
            status: 200
        });

        render(<Movies />,{wrapper: BrowserRouter});
    });

    it('should have error for loadMovieOnce', async () => {
        const errorMessage = 'Network Error';
        window.fetch.mockRejectedValue(new Error(errorMessage));

        // window.fetch.mockResolvedValueOnce({
        //     json: async () => mockMovieList,
        //     status: 200
        // });


        await new Promise((resolve) => {
            render(<Movies />,{wrapper: BrowserRouter});
            resolve();
        });
    });

    it('should hit the catch statement', async () => {

        window.fetch.mockResolvedValueOnce({
            json: async () => {
                throw new Error('Error parsing JSON');
            },
            status: 200
        });

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieList,
            status: 200
        });

        render(<Movies />,{wrapper: BrowserRouter});
    });

    it('should hit the catch statement pt2', async () => {

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieDetails,
            status: 200
        });

        window.fetch.mockResolvedValueOnce({
            json: async () => {
                throw new Error('Error parsing JSON');
            },
            status: 200
        });

        render(<Movies />,{wrapper: BrowserRouter});
    });

    it('should find and click modal button', async () => {

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieDetails,
            status: 200
        });

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieList,
            status: 200
        });

        const { getByTestId } = render(<Movies />,{wrapper: BrowserRouter});

        //expect(findByTestId('launchButton')).toBeInTheDocument();

        const launchModal = getByTestId('launchButton');
        expect(launchModal).toBeInTheDocument();

        launchModal.click();

    });

    it('should find and click the create button', async () => {

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieDetails,
            status: 200
        });

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieList,
            status: 200
        });

        const { getByTestId } = render(<Movies />,{wrapper: BrowserRouter});



        const launchModal = getByTestId('launchButton');
        expect(launchModal).toBeInTheDocument();

        fireEvent.click(launchModal);
        await new Promise(resolve => setTimeout(resolve, 50));


        fireEvent.click(getByTestId('Createco'));
        fireEvent.change(getByTestId('createInputSec'), { target: { value: 'test' } });
        const clickRadio = getByTestId('lineSomething');
        clickRadio.click();

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieList,
            status: 200
        });



        fireEvent.click(getByTestId('save-changes-test1'));

    });

    it('should find and click the create button with catch one', async () => {

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieDetails,
            status: 200
        });

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieList,
            status: 200
        });

        const { getByTestId } = render(<Movies />,{wrapper: BrowserRouter});


        const launchModal = getByTestId('launchButton');
        expect(launchModal).toBeInTheDocument();

        fireEvent.click(launchModal);
        await new Promise(resolve => setTimeout(resolve, 50));

        fireEvent.click(getByTestId('Createco'));
        fireEvent.change(getByTestId('createInputSec'), { target: { value: 'test' } });

        const errorMessage = 'Network Error';
        window.fetch.mockRejectedValueOnce(new Error(errorMessage));

        window.fetch.mockResolvedValue({
            json: async () => mockMovieList,
            status: 200
        });

        fireEvent.click(getByTestId('save-changes-test1'));

    });

    it('should find and click the create button with catch two', async () => {

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieDetails,
            status: 200
        });

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieList,
            status: 200
        });

        const { getByTestId } = render(<Movies />,{wrapper: BrowserRouter});

        const launchModal = getByTestId('launchButton');
        expect(launchModal).toBeInTheDocument();

        fireEvent.click(launchModal);
        await new Promise(resolve => setTimeout(resolve, 50));

        fireEvent.click(getByTestId('Createco'));
        fireEvent.change(getByTestId('createInputSec'), { target: { value: 'test' } });

        window.fetch.mockResolvedValueOnce({
            json: async () => {
                throw new Error('Error parsing JSON');
            },
            status: 200
        });

        fireEvent.click(getByTestId('save-changes-test1'));

    });

    it('should find and click the create button catch three wheeee', async () => {

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieDetails,
            status: 200
        });

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieList,
            status: 200
        });

        const { getByTestId } = render(<Movies />,{wrapper: BrowserRouter});


        const launchModal = getByTestId('launchButton');
        expect(launchModal).toBeInTheDocument();

        fireEvent.click(launchModal);
        await new Promise(resolve => setTimeout(resolve, 50));

        fireEvent.click(getByTestId('Createco'));
        fireEvent.change(getByTestId('createInputSec'), { target: { value: 'test' } });

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieList,
            status: 200
        });
        const errorMessage = 'Network Error';
        window.fetch.mockRejectedValue(new Error(errorMessage));


        fireEvent.click(getByTestId('save-changes-test1'));

    });

    it('should find and click the copy button', async () => {

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieDetails,
            status: 200
        });

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieList,
            status: 200
        });

        const { getByTestId } = render(<Movies />,{wrapper: BrowserRouter});


        const launchModal = getByTestId('launchButton');
        expect(launchModal).toBeInTheDocument();

        fireEvent.click(launchModal);
        await new Promise(resolve => setTimeout(resolve, 50));

        fireEvent.click(getByTestId('copyYaY'));

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieList,
            status: 200
        });

        const selectDrop = getByTestId('testSelectList');
        fireEvent.change(selectDrop, {target: {value: '2'}});

        fireEvent.click(getByTestId('save-changes-copy'));

    });

    it('should find and click the copy button catch 1', async () => {

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieDetails,
            status: 200
        });

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieList,
            status: 200
        });

        const { getByTestId } = render(<Movies />,{wrapper: BrowserRouter});


        const launchModal = getByTestId('launchButton');
        expect(launchModal).toBeInTheDocument();

        fireEvent.click(launchModal);
        await new Promise(resolve => setTimeout(resolve, 50));

        fireEvent.click(getByTestId('copyYaY'));

        const errorMessage = 'Network Error';
        window.fetch.mockRejectedValue(new Error(errorMessage));

        fireEvent.click(getByTestId('save-changes-copy'));

    });

    it('should find and click the move Button', async () => {

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieDetails,
            status: 200
        });

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieList,
            status: 200
        });

        const { debug, getAllByTestId, getByTestId } = render(<Movies />,{wrapper: BrowserRouter});

        await new Promise(resolve => setTimeout(resolve, 50));

        const moveButton = await getAllByTestId('moveClickArrow');
        const actButton = moveButton[0];

        fireEvent.click(actButton);

        await new Promise(resolve => setTimeout(resolve, 50));
        //debug();

        const moveFromWow = await getByTestId('save-changes-move-wow');
        fireEvent.click(moveFromWow);

        await new Promise(resolve => setTimeout(resolve, 50));

        const confirmModal = await getByTestId('confirmShowMove');
        expect(confirmModal).toBeInTheDocument();

        const selectDrop = getByTestId('testSelectList2');
        fireEvent.change(selectDrop, {target: {value: '2'}});

        const another = await getByTestId('save-changes-copy-move');

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieDetails,
            status: 200
        });

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieDetails,
            status: 200
        });

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieDetails,
            status: 200
        });

        fireEvent.click(another);

        //const click = getByTestId('moveClickArrow');

    });


    it('should find and click the move Button catch part', async () => {

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieDetails,
            status: 200
        });

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieList,
            status: 200
        });

        const { debug, getAllByTestId, getByTestId } = render(<Movies />,{wrapper: BrowserRouter});

        await new Promise(resolve => setTimeout(resolve, 50));

        const moveButton = await getAllByTestId('moveClickArrow');
        const actButton = moveButton[0];

        const allMinus = await getAllByTestId('moveMinusArrow');
        expect(allMinus[0]).toBeInTheDocument();

        const allAdd = await getAllByTestId('moveAddArrow');
        expect(allAdd[0]).toBeInTheDocument();

        const allCopy = await getAllByTestId('moveCopyArrow');
        expect(allCopy[0]).toBeInTheDocument();

        fireEvent.click(actButton);

        await new Promise(resolve => setTimeout(resolve, 50));

        const moveFromWow = await getByTestId('save-changes-move-wow');
        fireEvent.click(moveFromWow);

        await new Promise(resolve => setTimeout(resolve, 50));

        const another = await getByTestId('save-changes-copy-move');

        const errorMessage = 'Network Error';
        window.fetch.mockRejectedValue(new Error(errorMessage));

        fireEvent.click(another);

        //const click = getByTestId('moveClickArrow');

    });

    it('should find and click the move add button wow', async () => {

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieDetails,
            status: 200
        });

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieList,
            status: 200
        });

        const { getAllByTestId } = render(<Movies />,{wrapper: BrowserRouter});

        await new Promise(resolve => setTimeout(resolve, 50));

        const allAdd = await getAllByTestId('moveCopyArrow');
        expect(allAdd[0]).toBeInTheDocument();

        const actButton = allAdd[0];

        fireEvent.click(actButton);

        await new Promise(resolve => setTimeout(resolve, 50));
        //debug();
    });

    it('should find and do remove stuff', async () => {

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieDetails,
            status: 200
        });

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieList,
            status: 200
        });

        const { getAllByTestId, getByTestId } = render(<Movies />,{wrapper: BrowserRouter});

        await new Promise(resolve => setTimeout(resolve, 50));

        const allAdd = await getAllByTestId('moveMinusArrow');
        expect(allAdd[0]).toBeInTheDocument();

        const actButton = allAdd[0];

        fireEvent.click(actButton);

        await new Promise(resolve => setTimeout(resolve, 50));

        const confirm = getByTestId('yesPleaseDelete');

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieDetails,
            status: 200
        });

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieDetails,
            status: 200
        });

        fireEvent.click(confirm);
        //debug();
    });

    it('should find and do remove stuff with catch', async () => {

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieDetails,
            status: 200
        });

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieList,
            status: 200
        });

        const { getAllByTestId, getByTestId } = render(<Movies />,{wrapper: BrowserRouter});

        await new Promise(resolve => setTimeout(resolve, 50));

        const allAdd = await getAllByTestId('moveMinusArrow');
        expect(allAdd[0]).toBeInTheDocument();

        const actButton = allAdd[0];

        fireEvent.click(actButton);

        await new Promise(resolve => setTimeout(resolve, 50));

        const confirm = getByTestId('yesPleaseDelete');

        const errorMessage = 'Network Error';
        window.fetch.mockRejectedValue(new Error(errorMessage));

        fireEvent.click(confirm);
        //debug();
    });

    it('should find and click the move Button then create', async () => {

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieDetails,
            status: 200
        });

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieList,
            status: 200
        });

        const { debug, getAllByTestId, getByTestId } = render(<Movies />,{wrapper: BrowserRouter});

        await new Promise(resolve => setTimeout(resolve, 50));

        const moveButton = await getAllByTestId('moveClickArrow');
        const actButton = moveButton[0];

        fireEvent.click(actButton);

        await new Promise(resolve => setTimeout(resolve, 50));

        const modalThing = getByTestId('create-move-check');
        expect(modalThing).toBeInTheDocument();
        //debug();

        const moveFromWow = await getByTestId('move-to-create');
        fireEvent.click(moveFromWow);

        const closeButton = await getByTestId('showCreateClose');
        fireEvent.click(closeButton);

    });

    it('has a good move add arrow thing', async () => {

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieDetails,
            status: 200
        });

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieList,
            status: 200
        });

        const { debug, getAllByTestId, getByTestId } = render(<Movies />,{wrapper: BrowserRouter});

        await new Promise(resolve => setTimeout(resolve, 50));

        const allAdd = await getAllByTestId('moveAddArrow');
        expect(allAdd[0]).toBeInTheDocument();

        const actButton = allAdd[0];

        fireEvent.click(actButton);

        await new Promise(resolve => setTimeout(resolve, 50));

    });

    it('should find and click the move Button and then close', async () => {

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieDetails,
            status: 200
        });

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieList,
            status: 200
        });

        const { debug, getAllByTestId, getByTestId, getAllByLabelText, getByLabelText } = render(<Movies />,{wrapper: BrowserRouter});

        await new Promise(resolve => setTimeout(resolve, 50));

        const moveButton = await getAllByTestId('moveClickArrow');
        const actButton = moveButton[0];

        fireEvent.click(actButton);

        await new Promise(resolve => setTimeout(resolve, 50));

        const button = getByLabelText('Close');
        fireEvent.click(button);

        await new Promise(resolve => setTimeout(resolve, 50));
        debug();

    });

    it('should find and click the move Button with id two', async () => {

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieDetails,
            status: 200
        });

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieListTwo,
            status: 200
        });

        const { debug, getAllByTestId, getByTestId } = render(<Movies />,{wrapper: BrowserRouter});

        await new Promise(resolve => setTimeout(resolve, 50));

        const moveButton = await getAllByTestId('moveClickArrow');
        const actButton = moveButton[0];

        fireEvent.click(actButton);

        await new Promise(resolve => setTimeout(resolve, 50));
        //debug();

        const moveFromWow = await getByTestId('save-changes-move-wow');
        fireEvent.click(moveFromWow);

        await new Promise(resolve => setTimeout(resolve, 50));

        const confirmModal = await getByTestId('confirmShowMove');
        expect(confirmModal).toBeInTheDocument();

        const selectDrop = getByTestId('testSelectList2');
        fireEvent.change(selectDrop, {target: {value: '2'}});

        const another = await getByTestId('save-changes-copy-move');


        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieDetails,
            status: 200
        });

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieDetails,
            status: 200
        });

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieDetails,
            status: 200
        });

        fireEvent.click(another);

        //const click = getByTestId('moveClickArrow');

    });

    it('should find and click the copy button and then close button', async () => {

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieDetails,
            status: 200
        });

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieList,
            status: 200
        });

        const { getByTestId } = render(<Movies />,{wrapper: BrowserRouter});


        const launchModal = getByTestId('launchButton');
        expect(launchModal).toBeInTheDocument();

        fireEvent.click(launchModal);
        await new Promise(resolve => setTimeout(resolve, 50));

        fireEvent.click(getByTestId('copyYaY'));

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieList,
            status: 200
        });

        const close = getByTestId('byeClose');

        fireEvent.click(close);
    });

    it('should find and click the move Button and then close bye', async () => {

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieDetails,
            status: 200
        });

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieList,
            status: 200
        });

        const { getAllByTestId, getByTestId } = render(<Movies />,{wrapper: BrowserRouter});

        await new Promise(resolve => setTimeout(resolve, 50));

        const moveButton = await getAllByTestId('moveClickArrow');
        const actButton = moveButton[0];

        fireEvent.click(actButton);

        await new Promise(resolve => setTimeout(resolve, 50));
        //debug();

        const moveFromWow = await getByTestId('save-changes-move-wow');
        fireEvent.click(moveFromWow);

        await new Promise(resolve => setTimeout(resolve, 50));

        const close = getByTestId('closeMove');

        fireEvent.click(close);
    });

    it('scape key', async () => {

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieDetails,
            status: 200
        });

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieList,
            status: 200
        });

        const { debug, getAllByTestId, getByTestId } = render(<Movies />,{wrapper: BrowserRouter});

        await new Promise(resolve => setTimeout(resolve, 50));

        const moveButton = await getAllByTestId('moveClickArrow');
        const actButton = moveButton[0];

        fireEvent.click(actButton);

        await new Promise(resolve => setTimeout(resolve, 50));

        const modalThing = getByTestId('create-move-check');
        expect(modalThing).toBeInTheDocument();
        debug();
        fireEvent.keyDown(modalThing, { key: 'Escape', code: 'Escape' });
    });

    it('should find and click the copy button, then close to handle close', async () => {

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieDetails,
            status: 200
        });

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieList,
            status: 200
        });

        const { debug, getByTestId, getAllByLabelText } = render(<Movies />,{wrapper: BrowserRouter});


        const launchModal = getByTestId('launchButton');
        expect(launchModal).toBeInTheDocument();

        fireEvent.click(launchModal);
        await new Promise(resolve => setTimeout(resolve, 50));

        fireEvent.click(getByTestId('copyYaY'));

        //const button = getByTestId('copyMovieCloseButton').querySelector('button');
        const button = getAllByLabelText('Close');
        fireEvent.click(button[1]);

        await new Promise(resolve => setTimeout(resolve, 50));
        debug();

        // expect(getByTestId('copyMovie')).not.toBeInTheDocument();

    });

    it('should find and click the move Button and then close bye with onHandle or whatver', async () => {

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieDetails,
            status: 200
        });

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieList,
            status: 200
        });

        const { getAllByTestId, getByTestId, getByLabelText } = render(<Movies />,{wrapper: BrowserRouter});

        await new Promise(resolve => setTimeout(resolve, 50));

        const moveButton = await getAllByTestId('moveClickArrow');
        const actButton = moveButton[0];

        fireEvent.click(actButton);

        await new Promise(resolve => setTimeout(resolve, 50));
        //debug();

        const moveFromWow = await getByTestId('save-changes-move-wow');
        fireEvent.click(moveFromWow);

        await new Promise(resolve => setTimeout(resolve, 50));

        const button = getByLabelText('Close');
        fireEvent.click(button);

        await new Promise(resolve => setTimeout(resolve, 50));
    });

    it('should render the component with failed loadData', async () => {

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieDetails,
            status: 400
        });

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieList,
            status: 200
        });

        render(<Movies />,{wrapper: BrowserRouter});
    });

    it('should render the component with failed loadLists', async () => {

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieDetails,
            status: 200
        });

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieList,
            status: 400
        });

        render(<Movies />,{wrapper: BrowserRouter});
    });

    it('should find and click the create button but 40 error', async () => {

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieDetails,
            status: 200
        });

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieList,
            status: 200
        });

        const { getByTestId } = render(<Movies />,{wrapper: BrowserRouter});



        const launchModal = getByTestId('launchButton');
        expect(launchModal).toBeInTheDocument();

        fireEvent.click(launchModal);
        await new Promise(resolve => setTimeout(resolve, 50));


        fireEvent.click(getByTestId('Createco'));
        fireEvent.change(getByTestId('createInputSec'), { target: { value: 'test' } });
        const clickRadio = getByTestId('lineSomething');
        clickRadio.click();

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieList,
            status: 400
        });


        fireEvent.click(getByTestId('save-changes-test1'));
    });

    it('should find and click the copy button but 400 error', async () => {

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieDetails,
            status: 200
        });

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieList,
            status: 200
        });

        const { getByTestId } = render(<Movies />,{wrapper: BrowserRouter});


        const launchModal = getByTestId('launchButton');
        expect(launchModal).toBeInTheDocument();

        fireEvent.click(launchModal);
        await new Promise(resolve => setTimeout(resolve, 50));

        fireEvent.click(getByTestId('copyYaY'));

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieList,
            status: 400
        });
        const selectDrop = getByTestId('testSelectList');
        fireEvent.change(selectDrop, {target: {value: '2'}});

        fireEvent.click(getByTestId('save-changes-copy'));

    });

    it('should find and click the move Button catch part and then 400 error', async () => {

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieDetails,
            status: 200
        });

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieList,
            status: 200
        });

        const { debug, getAllByTestId, getByTestId } = render(<Movies />,{wrapper: BrowserRouter});

        await new Promise(resolve => setTimeout(resolve, 50));

        const moveButton = await getAllByTestId('moveClickArrow');
        const actButton = moveButton[0];

        const allMinus = await getAllByTestId('moveMinusArrow');
        expect(allMinus[0]).toBeInTheDocument();

        const allAdd = await getAllByTestId('moveAddArrow');
        expect(allAdd[0]).toBeInTheDocument();

        const allCopy = await getAllByTestId('moveCopyArrow');
        expect(allCopy[0]).toBeInTheDocument();

        fireEvent.click(actButton);

        await new Promise(resolve => setTimeout(resolve, 50));

        const moveFromWow = await getByTestId('save-changes-move-wow');
        fireEvent.click(moveFromWow);

        await new Promise(resolve => setTimeout(resolve, 50));

        const another = await getByTestId('save-changes-copy-move');

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieList,
            status: 400
        });

        fireEvent.click(another);

        //const click = getByTestId('moveClickArrow');

    });

    it('should find and do remove stuff but suddenly 400 error', async () => {

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieDetails,
            status: 200
        });

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieList,
            status: 200
        });

        const { getAllByTestId, getByTestId } = render(<Movies />,{wrapper: BrowserRouter});

        await new Promise(resolve => setTimeout(resolve, 50));

        const allAdd = await getAllByTestId('moveMinusArrow');
        expect(allAdd[0]).toBeInTheDocument();

        const actButton = allAdd[0];

        fireEvent.click(actButton);

        await new Promise(resolve => setTimeout(resolve, 50));

        const confirm = getByTestId('yesPleaseDelete');

        window.fetch.mockResolvedValueOnce({
            json: async () => mockMovieDetails,
            status: 400
        });

        fireEvent.click(confirm);
        //debug();
    });
});