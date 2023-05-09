import React, { useState } from 'react';
import {BrowserRouter} from 'react-router-dom';
import renderer from 'react-test-renderer';
import searchMovies from '../pages/Search.jsx';
import Search from '../pages/Search.jsx';
import httpRequest from '../utils/httpRequest.jsx';
const axios= require("axios");
jest.mock('axios');
import { render, fireEvent, screen,waitFor } from '@testing-library/react';
import handleHover from '../pages/Search.jsx';
import Popup from '../components/Popup';

test("correctly fetches a movie result for Shrek", async () => {

 const setUserId = jest.fn();
 const props = { setUid: setUserId };
 const { getByTestId } = render(<Search {...props}/>, {wrapper: BrowserRouter});
 const searchField = getByTestId("searchField");
 const query = "Shrek";
   axios.get.mockResolvedValue({
    data:
       {
           page: 1,
           results:
               [
                 {
                   adult: false,
                   backdrop: "/sRvXNDItGlWCqtO3j6wks52FmbD.jpg",
                   genre_ids: [16, 35, 14, 12, 10751],
                   id: 808,
                   original_language: "en",
                   original_title: "Shrek",
                   overview:
                     "It ain't easy bein' green -- especially if you're a likable (albeit smelly) ogre named Shrek. On a mission to retrieve a gorgeous princess from the clutches of a fire-breathing dragon, Shrek teams up with an unlikely compatriot -- a wisecracking donkey.",
                   popularity: 207.13,
                   poster_path: "/jhTVNBVkdS4Wf6NXYA9kRKQU3YM.jpg",
                   release_date: "2001-05-18",
                   title: "Shrek",
                   video: false,
                   vote_average: 7.716,
                   vote_count: 14992
                 }
               ],
               total_pages: 2,
               total_results: 25
       }
})
 fireEvent.change(searchField, { target: { value: "Shrek" } });
 fireEvent.submit(searchField);
 expect(await screen.findByText('Shrek')).toBeInTheDocument();
});

test("fails to fetch a movie result for shrek", async () => {

 const setUserId = jest.fn();
 const props = { setUid: setUserId };
 const { getByTestId } = render(<Search {...props}/>, {wrapper: BrowserRouter});
 const searchField = getByTestId("searchField");
 const query = "Shrek";
   axios.get.mockRejectedValueOnce({
    data:
       {
           page: 1,
           results:
            [],
            total_pages: 2,
            total_results: 25
       }

})
 fireEvent.change(searchField, { target: { value: "Shrek" } });
 fireEvent.submit(searchField);
 expect(await screen.findByText('No results found.')).toBeInTheDocument();
});

test("correctly fetches a movie result for Shrek and title option selected ", async () => {
  const setUserId = jest.fn();
  const props = {setUid: setUserId};
 const { getByTestId } = render(<Search {...props}/>, {wrapper: BrowserRouter});
 const searchField = getByTestId("searchField");
 const options = getByTestId("options");
 const query = "Shrek";
axios.get.mockResolvedValue({
      data:
         {
             page: 1,
             results:
                 [
                   {
                     adult: false,
                     backdrop: "/sRvXNDItGlWCqtO3j6wks52FmbD.jpg",
                     genre_ids: [16, 35, 14, 12, 10751],
                     id: 808,
                     original_language: "en",
                     original_title: "Shrek",
                     overview:
                       "It ain't easy bein' green -- especially if you're a likable (albeit smelly) ogre named Shrek. On a mission to retrieve a gorgeous princess from the clutches of a fire-breathing dragon, Shrek teams up with an unlikely compatriot -- a wisecracking donkey.",
                     popularity: 244.15,
                     poster_path: "/iB64vpL3dIObOtMZgX3RqdVdQDc.jpg",
                     release_date: "2001-05-18",
                     title: "Shrek",
                     video: false,
                     vote_average: 7.718,
                     vote_count: 15104
                   }
                 ],
                 total_pages: 2,
                 total_results: 25
         }
  })

 fireEvent.change(options, { target: { value: "title" } });
 fireEvent.change(searchField, { target: { value: "Shrek" } });
 fireEvent.submit(searchField);
expect(await screen.findByText('Shrek')).toBeInTheDocument();
});
test("fails to fetch a movie result for shrek with title option", async () => {
   const setUserId = jest.fn();
   const props = {setUid: setUserId};
  const { getByTestId } = render(<Search {...props}/>, {wrapper: BrowserRouter});
 const searchField = getByTestId("searchField");
 const query = "Shrek";
 const options = getByTestId("options");
   axios.get.mockRejectedValueOnce({
    data:
       {
           page: 1,
           results:
            [],
            total_pages: 2,
            total_results: 25
       }

})
 fireEvent.change(options, { target: { value: "title" } });
 fireEvent.change(searchField, { target: { value: "Shrek" } });
 fireEvent.submit(searchField);
 expect(await screen.findByText('No results found.')).toBeInTheDocument();
});
test("fails to fetch a movie result for shrek with keyword option", async () => {
   const setUserId = jest.fn();
   const props = {setUid: setUserId};
  const { getByTestId } = render(<Search {...props}/>, {wrapper: BrowserRouter});
 const searchField = getByTestId("searchField");
 const query = "Shrek";
 const options = getByTestId("options");
   axios.get.mockRejectedValueOnce({
    data:
       {
           page: 1,
           results:
            [],
            total_pages: 2,
            total_results: 25
       }

})
 fireEvent.change(options, { target: { value: "keyword" } });
 fireEvent.change(searchField, { target: { value: "Shrek" } });
 fireEvent.submit(searchField);
 expect(await screen.findByText('No results found.')).toBeInTheDocument();
});

test("correctly fetches a movie result for Shrek with release date filter", async () => {
   const setUserId = jest.fn();
   const props = {setUid: setUserId};
  const { getByTestId } = render(<Search {...props}/>, {wrapper: BrowserRouter});
 const searchField = getByTestId("searchField");
 const query = "Shrek";
 const startYear = getByTestId("startYear");
 const endYear = getByTestId("endYear");
   axios.get.mockResolvedValue({
    data:
       {
           page: 1,
           results:
               [
                 {
                   adult: false,
                   backdrop: "/sRvXNDItGlWCqtO3j6wks52FmbD.jpg",
                   genre_ids: [16, 35, 14, 12, 10751],
                   id: 808,
                   original_language: "en",
                   original_title: "Shrek",
                   overview:
                     "It ain't easy bein' green -- especially if you're a likable (albeit smelly) ogre named Shrek. On a mission to retrieve a gorgeous princess from the clutches of a fire-breathing dragon, Shrek teams up with an unlikely compatriot -- a wisecracking donkey.",
                   popularity: 207.13,
                   poster_path: "/jhTVNBVkdS4Wf6NXYA9kRKQU3YM.jpg",
                   release_date: "2001-05-18",
                   title: "Shrek",
                   video: false,
                   vote_average: 7.716,
                   vote_count: 14992
                 }
               ],
               total_pages: 2,
               total_results: 25
       }
})
  fireEvent.change(startYear, { target: { value: "2000" } });
  fireEvent.change(endYear, { target: { value: "2022" } });
  fireEvent.change(searchField, { target: { value: "Shrek" } });
  fireEvent.submit(searchField);
  expect(await screen.findByText('Shrek')).toBeInTheDocument();
  expect(await screen.findByText('2001-05-18')).toBeInTheDocument();
});

test("correctly fetches movies for an actor", async () => {
   const setUserId = jest.fn();
   const props = {setUid: setUserId};
  const { getByTestId } = render(<Search {...props}/>, {wrapper: BrowserRouter});
 const searchField = getByTestId("searchField");
 const options=getByTestId("options");
 const query = "Tom Hanks";
 axios.get.mockResolvedValueOnce({
     data: {
       page: 1,
       results: [
         {
           adult: false,
           gender: 2,
           id: 31,
           known_for:[{
           adult: false,
           backdrop_path: "/3h1JZGDhZ8nzxdgvkxha0qBqi05.jpg",
           genre_ids: [35, 18, 10749],
           id: 13,
           media_type: "movie",
           original_language: "en",
           original_title: "Forrest Gump",
           overview: "A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do. But despite all he has achieved, his one true love eludes him.",
           popularity: 75.609,
           poster_path: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
           release_date: "1994-06-23",
           title: "Forrest Gump",
           video: false,
           vote_average: 8.48,
           vote_count:24378},
           {
           adult: false,
           backdrop_path: "/lxD5ak7BOoinRNehOCA85CQ8ubr.jpg",
           genre_ids: [16, 12, 10751, 35],
           id: 862,
           media_type: "movie",
           original_language: "en",
           original_title: "Toy Story",
           overview: "Led by Woody, Andy's toys live happily in his room until Andy's birthday brings Buzz Lightyear onto the scene. Afraid of losing his place in Andy's heart, Woody plots against Buzz. But when circumstances separate Buzz and Woody from their owner, the duo eventually learns to put aside their differences.",
           popularity: 143.058,
           poster_path: "/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg",
           release_date: "1995-10-30",
           title: "Toy Story",
           video: false,
           vote_average: 7.967,
           vote_count:16502},
           {
            adult: false,
            backdrop_path: "/vxJ08SvwomfKbpboCWynC3uqUg4.jpg",
            genre_ids: [14, 18, 80],
            id: 497,
            media_type: "movie",
            original_language: "en",
            original_title: "The Green Mile",
            overview: "A supernatural tale set on death row in a Southern prison, where gentle giant John Coffey possesses the mysterious power to heal people's ailments. When the cell block's head guard, Paul Edgecomb, recognizes Coffey's miraculous gift, he tries desperately to help stave off the condemned man's execution.",
            popularity: 147.876,
            poster_path: "/o0lO84GI7qrG6XFvtsPOSV7CTNa.jpg",
            release_date: "1999-12-10",
            title: "The Green Mile",
            video: false,
            vote_average: 8.506,
            vote_count:15202}],
           known_for_department: "Acting",
           name: "Tom Hanks",
           original_name: "Tom Hanks",
           popularity: 137.53,
           profile_path: "/xndWFsBlClOJFRdhSt4NBwiPq2o.jpg",
         },
       ],
       total_pages: 1,
       total_results: 1,
     },
   });
   const personID=31;
 axios.get.mockResolvedValueOnce({
   data: {
     page: 1,
     cast: [
       {
         adult: false,
         backdrop_path: "/dGbBnTYxdHf1qyUgHsuFpxn1K4E.jpg",
         character: "Josh Baskin",
         credit_id: "52fe4349c3a36847f8048ac3",
         genre_ids: [14, 18, 35, 10749, 10751],
         id: 2280,
         order: 0,
         original_language: "en",
         original_title: "Big",
         overview: "When a young boy makes a wish at a carnival machine to be big—he wakes up the following morning to find that it has been granted and his body has grown older overnight. But he is still the same 13-year-old boy inside. Now he must learn how to cope with the unfamiliar world of grown-ups including getting a job and having his first romantic encounter with a woman.",
         popularity: 22.994,
         poster_path: "/eWhCDJiwxvx3YXkAFRiHjimnF0j.jpg",
         release_date: "1988-06-03",
         title: "Big",
         video: false,
         vote_average: 7.148,
         vote_count: 3111,
       },
     ],
     total_pages: 1,
     total_results: 1,
   },
 });
 fireEvent.change(options, { target: { value: "actor" } });
 fireEvent.change(searchField, { target: {value: 'Tom Hanks' } });
 fireEvent.submit(searchField);
 expect(await screen.findByText("Big")).toBeInTheDocument();
});
test("fails to fetch a movie result for Tom Hanks with actor option", async () => {
  const setUserId = jest.fn();
  const props = {setUid: setUserId};
 const { getByTestId } = render(<Search {...props}/>, {wrapper: BrowserRouter});
 const searchField = getByTestId("searchField");
 const query = "Tom Hanks";
 const options = getByTestId("options");
   axios.get.mockRejectedValueOnce({
    data:
       {
           page: 1,
           results:
            [],
            total_pages: 2,
            total_results: 25
       }

})
 fireEvent.change(options, { target: { value: "actor" } });
 fireEvent.change(searchField, { target: { value: "Tom Hanks" } });
 fireEvent.submit(searchField);
 expect(await screen.findByText('No results found.')).toBeInTheDocument();
});


test("calls routeChanger() when clicked ", async () => {
const onViewDetails = jest.fn();
 const searchMovies = jest.fn();
 const setUserId = jest.fn();
    const hasComeFromValid = jest.fn();
    const setHasComeFromValid = jest.fn();
 const props = { searchMovies, onViewDetails, setUid: setUserId, hasComeFromValid, setHasComeFromValid };
  const { getByTestId } = render(<Search {...props}/>, {wrapper: BrowserRouter});
   const searchField = getByTestId("searchField");
   const query = "Shrek";

     axios.get.mockResolvedValue({
      data:
         {
             page: 1,
             results:
                 [
                   {
                     adult: false,
                     backdrop: "/sRvXNDItGlWCqtO3j6wks52FmbD.jpg",
                     genre_ids: [16, 35, 14, 12, 10751],
                     id: 808,
                     original_language: "en",
                     original_title: "Shrek",
                     overview:
                       "It ain't easy bein' green -- especially if you're a likable (albeit smelly) ogre named Shrek. On a mission to retrieve a gorgeous princess from the clutches of a fire-breathing dragon, Shrek teams up with an unlikely compatriot -- a wisecracking donkey.",
                     popularity: 207.13,
                     poster_path: "/jhTVNBVkdS4Wf6NXYA9kRKQU3YM.jpg",
                     release_date: "2001-05-18",
                     title: "Shrek",
                     video: false,
                     vote_average: 7.716,
                     vote_count: 14992
                   }
                 ],
                 total_pages: 2,
                 total_results: 25
         }
 })
   fireEvent.change(searchField, { target: { value: "Shrek" } });
   fireEvent.submit(searchField);
   expect(await screen.findByText('Shrek')).toBeInTheDocument();
   const details = getByTestId("viewDetails");
   fireEvent.click(details);
   expect(onViewDetails).toHaveBeenCalled();
   expect(await screen.findByText('Shrek')).toBeInTheDocument();
});


test('handleHover should set hovered state to true', async () => {
  const searchMovies = jest.fn();
  const setUserId = jest.fn();
  const props = { searchMovies, setUid: setUserId};
   const { getByTestId } = render(<Search {...props}/>, {wrapper: BrowserRouter});
 const searchField = getByTestId("searchField");
 const options = getByTestId("options");
 const query = "Shrek";
 axios.get.mockResolvedValue({
      data:
         {
             page: 1,
             results:
                 [
                   {
                     adult: false,
                     backdrop: "/sRvXNDItGlWCqtO3j6wks52FmbD.jpg",
                     genre_ids: [16, 35, 14, 12, 10751],
                     id: 808,
                     original_language: "en",
                     original_title: "Shrek",
                     overview:
                       "It ain't easy bein' green -- especially if you're a likable (albeit smelly) ogre named Shrek. On a mission to retrieve a gorgeous princess from the clutches of a fire-breathing dragon, Shrek teams up with an unlikely compatriot -- a wisecracking donkey.",
                     popularity: 244.15,
                     poster_path: "/iB64vpL3dIObOtMZgX3RqdVdQDc.jpg",
                     release_date: "2001-05-18",
                     title: "Shrek",
                     video: false,
                     vote_average: 7.718,
                     vote_count: 15104
                   }
                 ],
                 total_pages: 2,
                 total_results: 25
         }
  })
 fireEvent.change(options, { target: { value: "title" } });
 fireEvent.change(searchField, { target: { value: "Shrek" } });
 fireEvent.submit(searchField);
 expect(await screen.findByText('Shrek')).toBeInTheDocument();
     //Wait for the image to load
     await waitFor(() => {
       const image = getByTestId('imgTest');
       expect(image).toBeInTheDocument();
       fireEvent.mouseEnter(image);
       expect(image).toHaveClass('hover-effect');
       fireEvent.mouseLeave(image);
       expect(image).not.toHaveClass('hover-effect');
     });
});


test('clicking add button should set buttonPopup state to true', async () => {
   const searchMovies = jest.fn();
   const setUserId = jest.fn();
   const props = { searchMovies, setUid: setUserId};
    const { getByTestId } = render(<Search {...props}/>, {wrapper: BrowserRouter});
 const searchField = getByTestId("searchField");
 const options = getByTestId("options");
 const query = "Shrek";

 axios.get.mockResolvedValue({
      data:
         {
             page: 1,
             results:
                 [
                   {
                     adult: false,
                     backdrop: "/sRvXNDItGlWCqtO3j6wks52FmbD.jpg",
                     genre_ids: [16, 35, 14, 12, 10751],
                     id: 808,
                     original_language: "en",
                     original_title: "Shrek",
                     overview:
                       "It ain't easy bein' green -- especially if you're a likable (albeit smelly) ogre named Shrek. On a mission to retrieve a gorgeous princess from the clutches of a fire-breathing dragon, Shrek teams up with an unlikely compatriot -- a wisecracking donkey.",
                     popularity: 244.15,
                     poster_path: "/iB64vpL3dIObOtMZgX3RqdVdQDc.jpg",
                     release_date: "2001-05-18",
                     title: "Shrek",
                     video: false,
                     vote_average: 7.718,
                     vote_count: 15104
                   }
                 ],
                 total_pages: 2,
                 total_results: 25
         }
  })
 fireEvent.change(options, { target: { value: "title" } });
 fireEvent.change(searchField, { target: { value: "Shrek" } });
 fireEvent.submit(searchField);
 expect(await screen.findByText('Shrek')).toBeInTheDocument();
     //Wait for the button to load
     await waitFor(() => {
       const addButton = getByTestId('addButton');
       expect(addButton).toBeInTheDocument();
       fireEvent.click(addButton);
       expect(addButton).toBeTruthy();
       expect(addButton.getAttribute('aria-expanded')).toBe('true');
      });
});

test('clicking mobile add button should set buttonPopup state to true', async () => {
  const searchMovies = jest.fn();
  const setUserId = jest.fn();
  const props = { searchMovies, setUid: setUserId};
   const { getByTestId } = render(<Search {...props}/>, {wrapper: BrowserRouter});
  // Set the viewport to mobile mode
  global.innerWidth = 360;
  global.dispatchEvent(new Event('resize'));

  const searchField = getByTestId("searchField");
  const options = getByTestId("options");
  const query = "Shrek";

  axios.get.mockResolvedValue({
    data: {
      page: 1,
      results: [
        {
          adult: false,
          backdrop: "/sRvXNDItGlWCqtO3j6wks52FmbD.jpg",
          genre_ids: [16, 35, 14, 12, 10751],
          id: 808,
          original_language: "en",
          original_title: "Shrek",
          overview:
            "It ain't easy bein' green -- especially if you're a likable (albeit smelly) ogre named Shrek. On a mission to retrieve a gorgeous princess from the clutches of a fire-breathing dragon, Shrek teams up with an unlikely compatriot -- a wisecracking donkey.",
          popularity: 244.15,
          poster_path: "/iB64vpL3dIObOtMZgX3RqdVdQDc.jpg",
          release_date: "2001-05-18",
          title: "Shrek",
          video: false,
          vote_average: 7.718,
          vote_count: 15104
        }
      ],
      total_pages: 2,
      total_results: 25
    }
  });

  fireEvent.change(options, { target: { value: "title" } });
  fireEvent.change(searchField, { target: { value: "Shrek" } });
  fireEvent.submit(searchField);

  expect(await screen.findByText('Shrek')).toBeInTheDocument();

  //Wait for the button to load
  await waitFor(() => {
    // Verify that the mobile button is visible
    const mobileButton = getByTestId('mobileAddButton');
    expect(mobileButton).toBeInTheDocument();
    fireEvent.click(mobileButton);
    expect(mobileButton).toBeTruthy();
    expect(mobileButton.getAttribute('aria-expanded')).toBe('true');
  });
});

test('handleLoadMore should call searchMovies', async () => {

  const searchMovies = jest.fn();
  const setUserId = jest.fn();
  const { getByTestId } = render(<Search searchMovies={searchMovies} setUid={setUserId}/>, {wrapper: BrowserRouter});

    const searchField = getByTestId("searchField");
     const options = getByTestId("options");
     const query = "Shrek";

     axios.get.mockResolvedValue({
       data: {
         page: 1,
         results: [
           {
             adult: false,
             backdrop: "/sRvXNDItGlWCqtO3j6wks52FmbD.jpg",
             genre_ids: [16, 35, 14, 12, 10751],
             id: 808,
             original_language: "en",
             original_title: "Shrek",
             overview:
               "It ain't easy bein' green -- especially if you're a likable (albeit smelly) ogre named Shrek. On a mission to retrieve a gorgeous princess from the clutches of a fire-breathing dragon, Shrek teams up with an unlikely compatriot -- a wisecracking donkey.",
             popularity: 244.15,
             poster_path: "/iB64vpL3dIObOtMZgX3RqdVdQDc.jpg",
             release_date: "2001-05-18",
             title: "Shrek",
             video: false,
             vote_average: 7.718,
             vote_count: 15104
           }
         ],
         total_pages: 2,
         total_results: 25
       }
     });

     fireEvent.change(options, { target: { value: "title" } });
     fireEvent.change(searchField, { target: { value: "Shrek" } });
     fireEvent.submit(searchField);
     await waitFor(() => {
     const loadMoreButton = getByTestId("loadMoreButton");
     fireEvent.click(loadMoreButton);
    });
     expect(await screen.findByText('Shrek')).toBeInTheDocument();
});

test('handleLoadMore should call searchMovies and fail', async () => {

  const searchMovies = jest.fn();
  const setUserId = jest.fn();
  const { getByTestId } = render(<Search searchMovies={searchMovies} setUid={setUserId}/>, {wrapper: BrowserRouter});

    const searchField = getByTestId("searchField");
     const options = getByTestId("options");
     const query = "Shrek";

     axios.get.mockResolvedValue({
       data: {
         page: 1,
         results: [
           {
             adult: false,
             backdrop: "/sRvXNDItGlWCqtO3j6wks52FmbD.jpg",
             genre_ids: [16, 35, 14, 12, 10751],
             id: 808,
             original_language: "en",
             original_title: "Shrek",
             overview:
               "It ain't easy bein' green -- especially if you're a likable (albeit smelly) ogre named Shrek. On a mission to retrieve a gorgeous princess from the clutches of a fire-breathing dragon, Shrek teams up with an unlikely compatriot -- a wisecracking donkey.",
             popularity: 244.15,
             poster_path: "/iB64vpL3dIObOtMZgX3RqdVdQDc.jpg",
             release_date: "2001-05-18",
             video: false,
             vote_average: 7.718,
             vote_count: 15104
           }
         ],
         total_pages: 2,
         total_results: 25
       }
     });

     fireEvent.change(options, { target: { value: "keyword" } });
     fireEvent.change(searchField, { target: { value: "Shrek" } });
     fireEvent.submit(searchField);
     await waitFor(() => {
     const loadMoreButton = getByTestId("loadMoreButton");
     fireEvent.click(loadMoreButton);
    });
     expect(await screen.findByText('Load More')).toBeInTheDocument;
});

it("correctly executes the setGenreQuery function ", async () => {

    const setGenrequery = jest.fn();
    const setUserId = jest.fn();
    const props = { gQuery: '12' , setGquery: setGenrequery , setUid: setUserId};
    const { getByTestId } = render(<Search {...props} />,{wrapper: BrowserRouter});
    axios.get.mockResolvedValue({
          data:
             {
                 page: 1,
                 results:
                     [
                       {
                         adult: false,
                         backdrop: "/sRvXNDItGlWCqtO3j6wks52FmbD.jpg",
                         genre_ids: [16, 35, 14, 12, 10751],
                         id: 808,
                         original_language: "en",
                         original_title: "Shrek",
                         overview:
                           "It ain't easy bein' green -- especially if you're a likable (albeit smelly) ogre named Shrek. On a mission to retrieve a gorgeous princess from the clutches of a fire-breathing dragon, Shrek teams up with an unlikely compatriot -- a wisecracking donkey.",
                         popularity: 244.15,
                         poster_path: "/iB64vpL3dIObOtMZgX3RqdVdQDc.jpg",
                         release_date: "2001-05-18",
                         title: "Shrek",
                         video: false,
                         vote_average: 7.718,
                         vote_count: 15104
                       }
                     ],
                     total_pages: 2,
                     total_results: 25
             }
      })
    expect(getByTestId("movie-container")).toBeTruthy();
    expect(await screen.findByText('Shrek')).toBeInTheDocument();

});

it("correctly executes the setActorQuery function ", async () => {

    const setActorquery = jest.fn();
    const setUserId = jest.fn();
    const props = { aQuery: '31' , setAquery: setActorquery, setUid: setUserId };
    const { getByTestId } = await waitFor(()=>render(<Search {...props} />,{wrapper: BrowserRouter}));
    axios.get.mockResolvedValueOnce({
    data: {
    results: [
               {
                 adult: false,
                 backdrop_path: "/dGbBnTYxdHf1qyUgHsuFpxn1K4E.jpg",
                 character: "Josh Baskin",
                 credit_id: "52fe4349c3a36847f8048ac3",
                 genre_ids: [14, 18, 35, 10749, 10751],
                 id: 31,
               },
             ]
            }});
    const actorLoad=await waitFor(()=>getByTestId("movie-container"));
     axios.get.mockResolvedValueOnce({
       data: {
         page: 1,
         cast: [
           {
             adult: false,
             backdrop_path: "/dGbBnTYxdHf1qyUgHsuFpxn1K4E.jpg",
             character: "Josh Baskin",
             credit_id: "52fe4349c3a36847f8048ac3",
             genre_ids: [14, 18, 35, 10749, 10751],
             id: 2280,
             order: 0,
             original_language: "en",
             original_title: "Big",
             overview: "When a young boy makes a wish at a carnival machine to be big—he wakes up the following morning to find that it has been granted and his body has grown older overnight. But he is still the same 13-year-old boy inside. Now he must learn how to cope with the unfamiliar world of grown-ups including getting a job and having his first romantic encounter with a woman.",
             popularity: 22.994,
             poster_path: "/eWhCDJiwxvx3YXkAFRiHjimnF0j.jpg",
             release_date: "1988-06-03",
             title: "Big",
             video: false,
             vote_average: 7.148,
             vote_count: 3111,
           },
         ],
         total_pages: 1,
         total_results: 1,
       },
     });
    expect(actorLoad).toBeTruthy();
    expect(await screen.findByText("Big")).toBeInTheDocument();

});
test('LoadMore should fail', async () => {
 const searchMovies = jest.fn();
 const setUserId = jest.fn();
 const props = { searchMovies, setUid: setUserId};
  const { getByTestId } = render(<Search {...props}/>, {wrapper: BrowserRouter});
    const searchField = getByTestId("searchField");
     const options = getByTestId("options");
     const query = "Shrek";

     axios.get.mockResolvedValue({
       data: {
         page: 1,
         results: [
           {

           }
         ],
         total_pages: 2,
         total_results: 25
       }
     });

     fireEvent.change(options, { target: { value: "title" } });
     fireEvent.change(searchField, { target: { value: "Shrek" } });
     fireEvent.submit(searchField);

     await waitFor(() => {
      const loadMoreButton = getByTestId("loadMoreButton");
      fireEvent.click(loadMoreButton);
    });
    expect(await screen.findByText('Load More')).toBeInTheDocument();
});
describe('Popup component', () => {
  it('renders properly', () => {
    const { getByText } = render(
      <Popup trigger={true} setTrigger={() => {}}>
        <div className="test-child">Test Content</div>
      </Popup>
    );
    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('does not render when trigger is false', () => {
    const { container } = render(
      <Popup trigger={false} setTrigger={() => {}}>
        <div className="test-child">Test Content</div>
      </Popup>
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders children properly', () => {
    const { getByText } = render(
      <Popup trigger={true} setTrigger={() => {}}>
        <div className="test-child">Test Content</div>
      </Popup>
    );
    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('sets trigger to false when close button is clicked', () => {
    const setTrigger = jest.fn();
    const { getByRole } = render(
      <Popup trigger={true} setTrigger={setTrigger}>
        <div className="test-child">Test Content</div>
      </Popup>
    );
    const closeButton = getByRole('button');
    fireEvent.click(closeButton);
    expect(setTrigger).toHaveBeenCalledWith(false);
  });
});

test("correctly fetches a movie result for drama and genre option selected ", async () => {
  const setUserId = jest.fn();
  const props = {setUid: setUserId};
 const { getByTestId } = render(<Search {...props}/>, {wrapper: BrowserRouter});
 const searchField = getByTestId("searchField");
 const options = getByTestId("options");
axios.get.mockResolvedValue({
      data:
         {
             page: 1,
             results:
                 [
                   {
                     original_title: "Titanic",
                     release_date: "1997-11-18",
                     title: "Titanic",
                     video: false,
                   }
                 ],
                 total_pages: 2,
                 total_results: 25
         }
  })

 fireEvent.change(options, { target: { value: "genre" } });
 fireEvent.change(searchField, { target: { value: "drama" } });
 fireEvent.submit(searchField);
expect(await screen.findByText('Titanic')).toBeInTheDocument();
});

test("correctly fetches no result for drama_ and genre option selected ", async () => {
  const setUserId = jest.fn();
  const props = {setUid: setUserId};
 const { getByTestId } = render(<Search {...props}/>, {wrapper: BrowserRouter});
 const searchField = getByTestId("searchField");
 const options = getByTestId("options");
axios.get.mockResolvedValue({
      data:
         {
             page: 1,
             results:
                 [
                   {
                     original_title: "Titanic",
                     release_date: "1997-11-18",
                     title: "Titanic",
                     video: false,
                   }
                 ],
                 total_pages: 2,
                 total_results: 25
         }
  })

 fireEvent.change(options, { target: { value: "genre" } });
 fireEvent.change(searchField, { target: { value: "drama_" } });
 fireEvent.submit(searchField);
expect(await screen.findByText('Load More')).toBeInTheDocument();
});

test("correctly fetches a movie result for science fiction and genre option selected ", async () => {
  const setUserId = jest.fn();
  const props = {setUid: setUserId};
 const { getByTestId } = render(<Search {...props}/>, {wrapper: BrowserRouter});
 const searchField = getByTestId("searchField");
 const options = getByTestId("options");
axios.get.mockResolvedValue({
      data:
         {
             page: 1,
             results:
                 [
                   {
                     original_title: "The Park",
                     release_date: "2023-03-02",
                     title: "The Park",
                     video: false,
                   }
                 ],
                 total_pages: 2,
                 total_results: 25
         }
  })

 fireEvent.change(options, { target: { value: "genre" } });
 fireEvent.change(searchField, { target: { value: "science fiction" } });
 fireEvent.submit(searchField);
expect(await screen.findByText('The Park')).toBeInTheDocument();
});

test("correctly fetches a movie result for tv movie and genre option selected ", async () => {
  const setUserId = jest.fn();
  const props = {setUid: setUserId};
 const { getByTestId } = render(<Search {...props}/>, {wrapper: BrowserRouter});
 const searchField = getByTestId("searchField");
 const options = getByTestId("options");
axios.get.mockResolvedValue({
      data:
         {
             page: 1,
             results:
                 [
                   {
                     original_title: "Under Wraps 2",
                     release_date: "2022-09-25",
                     title: "Under Wraps 2",
                     video: false,
                   }
                 ],
                 total_pages: 2,
                 total_results: 25
         }
  })

 fireEvent.change(options, { target: { value: "genre" } });
 fireEvent.change(searchField, { target: { value: "tv movie" } });
 fireEvent.submit(searchField);
expect(await screen.findByText('Under Wraps 2')).toBeInTheDocument();
});

test("correctly displays an empty list when the add to existing list button is clicked", async () => {
  const setUserId = jest.fn();
  const props = {setUid: setUserId};
 const { getByTestId } = render(<Search {...props}/>, {wrapper: BrowserRouter});
 const searchField = getByTestId("searchField");
 const options = getByTestId("options");
axios.get.mockResolvedValue({
      data:
         {
             page: 1,
             results:
                 [
                   {
                     original_title: "The Park",
                     release_date: "2023-03-02",
                     title: "The Park",
                     video: false,
                   }
                 ],
                 total_pages: 2,
                 total_results: 25
         }
  })

 fireEvent.change(options, { target: { value: "genre" } });
 fireEvent.change(searchField, { target: { value: "science fiction" } });
 fireEvent.submit(searchField);
      await waitFor(() => {
       const addB =  getByTestId("addButton");
       fireEvent.click(addB);
        const addToE= getByTestId("addToExisting");
       fireEvent.click(addToE);
     });
     expect(await screen.findByText('-- Select a list --')).toBeInTheDocument();

});

test("correctly creates a new list and displays the drop down containing the new list ", async () => {
      const setUserId = jest.fn();
      const props = {setUid: setUserId};
     const { getByTestId } = render(<Search {...props}/>, {wrapper: BrowserRouter});
     const searchField = getByTestId("searchField");
     const options = getByTestId("options");
    axios.get.mockResolvedValue({
          data:
             {
                 page: 1,
                 results:
                     [
                       {
                         original_title: "The Park",
                         release_date: "2023-03-02",
                         title: "The Park",
                         video: false,
                       }
                     ],
                     total_pages: 2,
                     total_results: 25
             }
      })

     fireEvent.change(options, { target: { value: "genre" } });
     fireEvent.change(searchField, { target: { value: "science fiction" } });
     fireEvent.submit(searchField);

     await waitFor(() => {
     const addB =  getByTestId("addButton");
     fireEvent.click(addB);
     const createNew =  getByTestId("createNewList");
     fireEvent.click(createNew);
     const newListPopUp= getByTestId("createListPopUpInput");
     const newListSubmit = getByTestId("createListPopUpSubmit");
     fetch.mockResolvedValueOnce({
     json: () => Promise.resolve({
          listId: 1,
          listName: 'hello',
          movie: []
          })
     });

     fireEvent.change(newListPopUp, { target: { value: "hello" } });
     fetch.mockResolvedValueOnce({
          json: () => Promise.resolve([{
          listId: 1,
          listName: 'hello',
          movie: []
          }])
        });
        fireEvent.submit(newListPopUp);
     });
     await waitFor(() => {
        const addB =  getByTestId("addButton");
        fireEvent.click(addB);
        const addToE= getByTestId("addToExisting");
        fireEvent.click(addToE);
        });
       expect(await screen.findByText("hello")).toBeInTheDocument();
});

test("correctly displays error message when backend API call for creating a new list fails", async () => {
      const setUserId = jest.fn();
      const props = {setUid: setUserId};
     const { getByTestId } = render(<Search {...props}/>, {wrapper: BrowserRouter});
     const searchField = getByTestId("searchField");
     const options = getByTestId("options");
    axios.get.mockResolvedValue({
          data:
             {
                 page: 1,
                 results:
                     [
                       {
                         original_title: "The Park",
                         release_date: "2023-03-02",
                         title: "The Park",
                         video: false,
                       }
                     ],
                     total_pages: 2,
                     total_results: 25
             }
      })

     fireEvent.change(options, { target: { value: "genre" } });
     fireEvent.change(searchField, { target: { value: "science fiction" } });
     fireEvent.submit(searchField);

     await waitFor(() => {
     const addB =  getByTestId("addButton");
     fireEvent.click(addB);
     const createNew =  getByTestId("createNewList");
     fireEvent.click(createNew);
     const newListPopUp= getByTestId("createListPopUpInput");
     const newListSubmit = getByTestId("createListPopUpSubmit");
     fireEvent.change(newListPopUp, { target: { value: "hello" } });
       fireEvent.submit(newListPopUp);
     });
     expect(await screen.findByText("The list name already exists, try a different name.")).toBeInTheDocument();
});

test("eye handler shows that a movie is not in any lists", async () => {
      const setUserId = jest.fn();
      const eyeHandler = jest.fn();
      const props = {setUid: setUserId};
     const { getByTestId } = render(<Search {...props}/>, {wrapper: BrowserRouter});
     const searchField = getByTestId("searchField");
     const options = getByTestId("options");
    axios.get.mockResolvedValue({
          data:
             {
                 page: 1,
                 results:
                     [
                       {
                         original_title: "The Park",
                         release_date: "2023-03-02",
                         title: "The Park",
                         video: false,
                       }
                     ],
                     total_pages: 2,
                     total_results: 25
             }
      })

     fireEvent.change(options, { target: { value: "genre" } });
     fireEvent.change(searchField, { target: { value: "science fiction" } });
     fireEvent.submit(searchField);

     await waitFor(() => {
     const eyeB =  getByTestId("eyeButton");
     fireEvent.click(eyeB);
});
    fireEvent.click(screen.getByTestId("movie-eye-button-1"));
     expect(await screen.findByText("This movie is not in any of your lists!")).toBeInTheDocument();
});



test("correctly creates a new list, displays the drop down containing the new list, and adds a movie to that list ", async () => {
      const setUserId = jest.fn();
      const props = {setUid: setUserId};
     const { getByTestId } = render(<Search {...props}/>, {wrapper: BrowserRouter});
     const searchField = getByTestId("searchField");
     const options = getByTestId("options");
    axios.get.mockResolvedValue({
          data:
             {
                 page: 1,
                 results:
                     [
                       {
                         original_title: "The Park",
                         release_date: "2023-03-02",
                         title: "The Park",
                         video: false,
                       }
                     ],
                     total_pages: 2,
                     total_results: 25
             }
      })

     fireEvent.change(options, { target: { value: "genre" } });
     fireEvent.change(searchField, { target: { value: "science fiction" } });
     fireEvent.submit(searchField);

     await waitFor(() => {
     const addB =  getByTestId("addButton");
     fireEvent.click(addB);
     const createNew =  getByTestId("createNewList");
     fireEvent.click(createNew);
     const newListPopUp= getByTestId("createListPopUpInput");
     const newListSubmit = getByTestId("createListPopUpSubmit");
     fetch.mockResolvedValueOnce({
     json: () => Promise.resolve({
          listId: 1,
          listName: 'hello',
          movie: []
          })
     });

     fireEvent.change(newListPopUp, { target: { value: "hello" } });
     fetch.mockResolvedValueOnce({
          json: () => Promise.resolve([{
          listId: 1,
          listName: 'hello',
          movie: []
          }])
        });
        fireEvent.submit(newListPopUp);
     });
        await waitFor(() => {
        const addB =  getByTestId("addButton");
        fireEvent.click(addB);
        const addToE= getByTestId("addToExisting");
        fireEvent.click(addToE);

        const listToAdd = getByTestId("listOptions");
        fireEvent.change(listToAdd, { target: { value: 1 } });
        const selectedListSubmit= getByTestId("submitSelectedList");
                            axios.get.mockResolvedValue({
                                      data:

                                                   {
                                                   genres: [{id: 28, name: 'Action'}, {id: 18, name: 'Drama'},
                                                    {id: 27, name: 'Horror'},{id: 878, name: 'Science Fiction'},{id: 53, name: 'Thriller'}],
                                                   production_companies: [{id: 46453, logo_path: '/pftS6dWlYOqNKRHektMx3UiwOgS.png', name: 'Vanishing Angle', origin_country: 'US'}],
                                                   credits:{
                                                       cast:[{name: 'Chloe Guidry'},{name: 'Nhedrick Jabier'},{name: 'Carmina Garay'},
                                                       {name: 'Billy Slaughter'},{name: 'Carli McIntyre'},{name: 'Laura Coover'},{name: 'Presley Richardson'},
                                                       {name: 'Sean Papajohn'},{name: 'Legend Jay Jones'},{name: 'Evan Soto'},{name: 'Makaila Faith Nixon'}],
                                                       crew:[{job: "Director", name: "Shal Ngo"}]
                                                       }
                                                   }
                                  });

                                           fetch.mockResolvedValueOnce({
                                                       json: () =>
                                                         Promise.resolve([
                                                           {
                                                             listId: 1,
                                                             listName: "hello",
                                                             movie: [{
                                                               movieDbId: 1084225,
                                                               picture:
                                                                "https://image.tmdb.org/t/p/w500/hR1jdCw0A9czgsbp45TASkjjBhA.jpg",
                                                               title: "The Park",
                                                               plot: "A dystopian coming-of-age movie focused on three kids who find themselves in an abandoned amusement park, aiming to unite whoever remains. With dangers lurking around every corner, they will do whatever it takes to survive their hellish Neverland.",
                                                               genre: "28,18,27,878,53",
                                                               studio: "Vanishing Angle",
                                                               actors:
                                           "Chloe Guidry,Nhedrick Jabier,Carmina Garay,Billy Slaughter,Carli McIntyre,Laura Coover,Presley Richardson,Sean Papajohn,Legend Jay Jones,Evan Soto,Makaila Faith Nixon",
                                                               directors: "Shal Ngo"
                                                             }],
                                                           },
                                                         ]),
                                                     });
                            fireEvent.submit(selectedListSubmit);
                            const eyeB =  getByTestId("eyeButton");
                            fireEvent.click(eyeB);
                         });
                         expect(await screen.findAllByText("hello")).not.toBeNull();
//                            expect(await screen.findByText("hello")).toBeInTheDocument();

});

//Test: useEffect
  it("correctly shows the user's list", async () => {
      const setUserId = jest.fn();
      const setLists = jest.fn();
        const mockData = [
        {listId: 1,
          listName: 'hello',
          movie: []}];
        jest.spyOn(global, 'fetch').mockResolvedValue({
          json: () => Promise.resolve(mockData),
        });

            const props = {setUid: setUserId};
           const { getByTestId } = render(<Search {...props}/>, {wrapper: BrowserRouter});
           const searchField = getByTestId("searchField");
           const options = getByTestId("options");
          axios.get.mockResolvedValue({
                data:
                   {
                       page: 1,
                       results:
                           [
                             {
                               original_title: "The Park",
                               release_date: "2023-03-02",
                               title: "The Park",
                               video: false,
                             }
                           ],
                           total_pages: 2,
                           total_results: 25
                   }
            })

           fireEvent.change(options, { target: { value: "genre" } });
           fireEvent.change(searchField, { target: { value: "science fiction" } });
           fireEvent.submit(searchField);
                  await waitFor(() => {
                     const addB =  getByTestId("addButton");
                     fireEvent.click(addB);
                     const addToE= getByTestId("addToExisting");
                     fireEvent.click(addToE);
                     });

                 expect(await screen.findByText("hello")).toBeInTheDocument();
});

test("correctly fetches a movie result for tv movie", async () => {
  const setUserId = jest.fn();
  const props = {gQuery: 'tv movie', setUid: setUserId};
 const { getByTestId } = render(<Search {...props}/>, {wrapper: BrowserRouter});
 const searchField = getByTestId("searchField");
 const options = getByTestId("options");
axios.get.mockResolvedValue({
      data:
         {
             page: 1,
             results:
                 [
                   {
                     original_title: "Avatar: The Way of Water",
                     release_date: "2022-12-14",
                     title: "Avatar: The Way of Water",
                     video: false,
                   }
                 ],
                 total_pages: 2,
                 total_results: 25
         }
  })

 fireEvent.change(options, { target: { value: "genre" } });
 fireEvent.change(searchField, { target: { value: "tv movie" } });
 fireEvent.submit(searchField);
expect(await screen.findByText('Avatar: The Way of Water')).toBeInTheDocument();
});


//test
test("correctly fetches a movie result for else block in genrequery", async () => {
  const setUserId = jest.fn();
  const props = {gQuery: 'science_fiction', setUid: setUserId};
 const { getByTestId } = render(<Search {...props}/>, {wrapper: BrowserRouter});
 const searchField = getByTestId("searchField");
 const options = getByTestId("options");
axios.get.mockResolvedValue({
      data:
         {
             page: 1,
             results:
                 [
                   {
                     original_title: "Avatar: The Way of Water",
                     release_date: "2022-12-14",
                     title: "Avatar: The Way of Water",
                     video: false,
                   }
                 ],
                 total_pages: 2,
                 total_results: 25
         }
  })

 fireEvent.change(options, { target: { value: "genre" } });
 fireEvent.change(searchField, { target: { value: "science_fiction" } });
 fireEvent.submit(searchField);
expect(await screen.findByText('Avatar: The Way of Water')).toBeInTheDocument();
});

//test
test("correctly fetches a movie result for science fiction", async () => {
  const setUserId = jest.fn();
  const props = {gQuery: 'science fiction', setUid: setUserId};
  const { getByTestId } = render(<Search {...props}/>, {wrapper: BrowserRouter});
  const searchField = getByTestId("searchField");
  const options = getByTestId("options");

  axios.get.mockResolvedValue({
    data: {
      page: 1,
      results: [
        {
          original_title: "Blade Runner 2049",
          release_date: "2017-10-04",
          title: "Blade Runner 2049",
          video: false,
        },
      ],
      total_pages: 1,
      total_results: 1,
    },
  });

  fireEvent.change(options, { target: { value: "genre" } });
  fireEvent.change(searchField, { target: { value: "science fiction" } });
  fireEvent.submit(searchField);

  expect(await screen.findByText('Blade Runner 2049')).toBeInTheDocument();
});

//test
test("correctly sets movies to empty array and page to 1 when search button is clicked and the option is changed", async () => {
  const setUserId = jest.fn();
  const setMovies = jest.fn();
  const setPage = jest.fn();
  const props = {setMovies, setUid: setUserId};

 const { getByTestId } = render(<Search {...props}/>, {wrapper: BrowserRouter});
 const searchField = getByTestId("searchField");
 const options = getByTestId("options");
 const query = "Shrek";
axios.get.mockResolvedValue({
      data:
         {
             page: 1,
             results:
                 [
                   {
                     adult: false,
                     backdrop: "/sRvXNDItGlWCqtO3j6wks52FmbD.jpg",
                     genre_ids: [16, 35, 14, 12, 10751],
                     id: 808,
                     original_language: "en",
                     original_title: "Shrek",
                     overview:
                       "It ain't easy bein' green -- especially if you're a likable (albeit smelly) ogre named Shrek. On a mission to retrieve a gorgeous princess from the clutches of a fire-breathing dragon, Shrek teams up with an unlikely compatriot -- a wisecracking donkey.",
                     popularity: 244.15,
                     poster_path: "/iB64vpL3dIObOtMZgX3RqdVdQDc.jpg",
                     release_date: "2001-05-18",
                     title: "Shrek",
                     video: false,
                     vote_average: 7.718,
                     vote_count: 15104
                   }
                 ],
                 total_pages: 2,
                 total_results: 25
         }
  })

 fireEvent.change(options, { target: { value: "title" } });
 fireEvent.change(searchField, { target: { value: "Shrek" } });
 fireEvent.submit(searchField);
  await waitFor(() => {
      const clickme = getByTestId("clickme");
      fireEvent.click(clickme);
      expect(setMovies).not.toHaveBeenCalled();
     });

});

it("correctly renders the url and redirects the user to buy tickets ", async () => {
      const setUserId = jest.fn();
      const setLists = jest.fn();

            const props = {setUid: setUserId};
           const { getByTestId } = render(<Search {...props}/>, {wrapper: BrowserRouter});
           const searchField = getByTestId("searchField");
           const options = getByTestId("options");
          axios.get.mockResolvedValue({
                data:
                   {
                       page: 1,
                       results:
                           [
                             {
                               original_title: "The Park",
                               release_date: "2023-03-02",
                               title: "The Park",
                               video: false,
                             }
                           ],
                           total_pages: 2,
                           total_results: 25
                   }
            })

           fireEvent.change(options, { target: { value: "genre" } });
           fireEvent.change(searchField, { target: { value: "science fiction" } });
           fireEvent.submit(searchField);
                  await waitFor(() => {
                     const dollarB =  getByTestId("dollar-button");
                     fireEvent.click(dollarB);
                     });

                 expect(await screen.findByText("The Park")).toBeInTheDocument();
});
