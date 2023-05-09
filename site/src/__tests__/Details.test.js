import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import React from "react";
import axios from 'axios';
import Details from '../pages/Details.jsx';
import {BrowserRouter} from 'react-router-dom';

describe('Details component', () => {
  beforeEach(() => {
    jest.spyOn(axios, 'get').mockResolvedValue({
      data:{
             adult: false,
             genres: [{id: 12, name: 'Adventure'}, {id: 18, name: 'Drama'} ],
             overview:"The story of an Indian boy named Pi, a zookeeper's son who finds himself in the company of a hyena, zebra, orangutan, and a Bengal tiger after a shipwreck sets them adrift in the Pacific Ocean.",
             poster_path: "/mYDKm9HxImm8PRru3KbkHAe1cmk.jpg",
             release_date: "2012-11-20",
             original_title: "Life of Pi",
              production_companies: [
                                     {name: "Fox 2000 Pictures"},
                                     {name: "Dune Entertainment"},
                                     {name: "Ingenious Media"},
                                     {name: "Haishang Films"},
                                     {name: "Big Screen Productions"},
                                     {name: "Ingenious Film Partners"},
                                     {name: "Netter Productions"},],
              credits:{
                       cast: [{name: "Suraj Sharma"}],
                       crew: [{
                               known_for_department:"Directing",
                               name: "Ang Lee"
                               }]
                       }
              },
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('fetches movie details and updates state', async () => {
  const hasComeFromValid = jest.fn();
  const setHasComeFromValid = jest.fn();
    const props = { details: '87827' , userId: 1, hasComeFromValid, setHasComeFromValid};
    const { getByText } = render(<Details {...props} />,{wrapper: BrowserRouter});
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        'https://api.themoviedb.org/3/movie/87827?api_key=00f824df761bd517e281a3753a0a70f1&append_to_response=credits'
      );
    });
   expect(await screen.findByText(/Ang Lee/)).toBeInTheDocument();
    const dateRegex = /2012-11-20/;
    const titleRegex = /Life of Pi/;
    const genreRegex = /Adventure/;
    expect(screen.getByText(dateRegex)).toBeInTheDocument();
    expect(screen.getByText(titleRegex)).toBeInTheDocument();
    expect(screen.getByText(genreRegex)).toBeInTheDocument();
    expect(getByText("Suraj Sharma")).toBeInTheDocument();
    expect(getByText("The story of an Indian boy named Pi, a zookeeper's son who finds himself in the company of a hyena, zebra, orangutan, and a Bengal tiger after a shipwreck sets them adrift in the Pacific Ocean." )).toBeInTheDocument();
  });

//Test1: hover effect
it('handleHover should set hovered state to true', async () => {
 const props = { details: '87827', userId: 1 };
                    const { getByTestId } = render(<Details {...props} />,{wrapper: BrowserRouter});
                    await waitFor(() => {
                      expect(axios.get).toHaveBeenCalledWith(
                        'https://api.themoviedb.org/3/movie/87827?api_key=00f824df761bd517e281a3753a0a70f1&append_to_response=credits'
                      );
                    });
         expect(await screen.findByText(/Ingenious Film Partners/)).toBeInTheDocument();
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



//test2: create new list
  it("correctly creates a new list and displays the drop down containing the new list ", async () => {
                  const props = { details: '87827' , userId: 1};
                    const { getByTestId } = render(<Details {...props} />,{wrapper: BrowserRouter});
                    await waitFor(() => {
                      expect(axios.get).toHaveBeenCalledWith(
                        'https://api.themoviedb.org/3/movie/87827?api_key=00f824df761bd517e281a3753a0a70f1&append_to_response=credits'
                      );
                    });

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


//test3: Error msg
it("correctly displays error message when backend API call for creating a new list fails", async () => {
       const props = { details: '87827' , userId: 1};
         const { getByTestId } = render(<Details {...props} />,{wrapper: BrowserRouter});
        await waitFor(() => {
       expect(axios.get).toHaveBeenCalledWith(
        'https://api.themoviedb.org/3/movie/87827?api_key=00f824df761bd517e281a3753a0a70f1&append_to_response=credits'
        );
        });

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

//test4:eyehandler-->Catch

it("eye handler shows that a movie is not in any lists", async () => {
   const props = { details: '87827', userId: 1 };
   const { getByTestId } = render(<Details {...props} />,{wrapper: BrowserRouter});
  await waitFor(() => {
   expect(axios.get).toHaveBeenCalledWith(
    'https://api.themoviedb.org/3/movie/87827?api_key=00f824df761bd517e281a3753a0a70f1&append_to_response=credits'
    );
    });

     await waitFor(() => {
     const eyeB =  getByTestId("eyeButton");
     fireEvent.click(eyeB);
});
     expect(await screen.findByText("This movie is not in any of your lists!")).toBeInTheDocument();
});

//test5 EyeHandler: Try clock -->Display lists that have the movie
 it("correctly displays the list which contains the movie catch block ", async () => {
   const setEyeMsg = jest.fn();
   const setListEye = jest.fn();
                  const props = { details: '87827' , userId: 1};
                    const { getByTestId } = render(<Details {...props} />,{wrapper: BrowserRouter});
                    await waitFor(() => {
                      expect(axios.get).toHaveBeenCalledWith(
                        'https://api.themoviedb.org/3/movie/87827?api_key=00f824df761bd517e281a3753a0a70f1&append_to_response=credits'
                      );
                    });

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
           });


//test6
 it("correctly displays the list which contains the movie", async () => {

                  const props = { details: '87827', userId: 1 };
                    const { getByTestId } = render(<Details {...props} />,{wrapper: BrowserRouter});
                    await waitFor(() => {
                      expect(axios.get).toHaveBeenCalledWith(
                        'https://api.themoviedb.org/3/movie/87827?api_key=00f824df761bd517e281a3753a0a70f1&append_to_response=credits'
                      );
                    });

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

//                await waitFor(() => {
//                        const eyeB =  getByTestId("eyeButton");
//                        fireEvent.click(eyeB);
//                   });

               expect(await screen.findByText("hello")).toBeInTheDocument();
           });



  //Test7: useEffect
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
      const props = { details: '87827', setUid: setUserId };
      const { getByTestId } = render(<Details {...props} />,{wrapper: BrowserRouter});
      await waitFor(() => {
       expect(axios.get).toHaveBeenCalledWith(
        'https://api.themoviedb.org/3/movie/87827?api_key=00f824df761bd517e281a3753a0a70f1&append_to_response=credits'
        );
        });

                  await waitFor(() => {
                     const addB =  getByTestId("addButton");
                     fireEvent.click(addB);
                     const addToE= getByTestId("addToExisting");
                     fireEvent.click(addToE);
                     });

                 expect(await screen.findByText("hello")).toBeInTheDocument();
             });

});

it("correctly executes the genreClickHandler function ", async () => {
    const hasComeFromValid = jest.fn();
    const setHasComeFromValid = jest.fn();
    const setGenreQuery = jest.fn();
    const props = { details: '87827' , onLinkClick: setGenreQuery, userId: 1, hasComeFromValid, setHasComeFromValid };
    const { getAllByTestId } = render(<Details {...props} />,{wrapper: BrowserRouter});
    const genreLink=await waitFor(()=>getAllByTestId("genreLink"));
    fireEvent.click(genreLink[0]);
    expect(getAllByTestId("genreLink")).toBeTruthy();

});
it("correctly executes the actorClickHandler function ", async () => {
    const hasComeFromValid = jest.fn();
    const setHasComeFromValid = jest.fn();
    const setActorQuery = jest.fn();
    const props = { details: '87827' , onActorClick: setActorQuery, userId: 1, hasComeFromValid, setHasComeFromValid };
    const { getAllByTestId } = render(<Details {...props} />,{wrapper: BrowserRouter});
    const actorLink=await waitFor(()=>getAllByTestId("actorLink"));
    fireEvent.click(actorLink[0]);
    expect(getAllByTestId("actorLink")).toBeTruthy();

});

it("correctly renders the url and redirects the user to buy tickets", async () => {
                  const props = { details: '87827' , userId: 1};
                    const { getByTestId } = render(<Details {...props} />,{wrapper: BrowserRouter});
                await waitFor(() => {
                const dollarB =  getByTestId("dollar-button");
                fireEvent.click(dollarB);
                expect(getByTestId("dollar-button")).toBeTruthy();
                });

           });
