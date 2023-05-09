import Montage from "./pages/Montage"
import React from 'react';
import {render} from '@testing-library/react';
import {act} from "react-dom/test-utils";
import {BrowserRouter} from "react-router-dom";


const oneReturn = [
    {
        movieDbId: 1,
        picture: "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg"
    },
    {
        movieDbId: 2,
        picture: "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg"
    },
    {
        movieDbId: 3,
        picture: "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg"
    },
    {
        movieDbId: 4,
        picture: "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg"
    },
    {
        movieDbId: 1,
        picture: "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg"
    },
    {
        movieDbId: 2,
        picture: "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg"
    },
    {
        movieDbId: 3,
        picture: "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg"
    },
    {
        movieDbId: 4,
        picture: "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg"
    },
    {
        movieDbId: 3,
        picture: "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg"
    },
    {
        movieDbId: 4,
        picture: "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg"
    }
]


const TwoReturn = [
    {
        movieDbId: 4,
        picture: "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg"
    }
]




describe("Testing the montage page", () => {
    beforeAll(() => {
        jest.spyOn(window, 'fetch');
    });


    beforeEach(() => {
        window.fetch.mockClear();
    });


    it("Testing montage with 10 pictures", async() => {
        window.fetch.mockResolvedValueOnce({
            json: async () => oneReturn,
            status: 200
        });
        await act(() => {
            render(<Montage />,{wrapper: BrowserRouter})
        });
    });


    it("Testing montage with less than 10 pictures", async() => {
        window.fetch.mockResolvedValueOnce({
            json: async () => TwoReturn,
            status: 200
        });
        await act(() => {
            render(<Montage />,{wrapper: BrowserRouter})
        });
    });
});

