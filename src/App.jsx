
import { useReducer } from 'react'
import { createContext } from 'react'
import './App.css'
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import CardList from './Components/CardList/CardList'
import Footer from './Components/Footer/Footer';
import Navbar from './Components/Navbar/Navbar';

export const MyContext = createContext();

function App() {
  const initData = {
    Pending: [],
    InProgress: [],
    Completed: []
  }

  const reducerFn = (state, { type, payload }) => {
    switch (type) {
      case 'Add_Item':
        return {
          ...state,
        [payload.typeOfList]: [
            ...state[payload.typeOfList],
            payload.title
          ]
        };
      case 'Edit_Item':
        return {
          ...state,
          [payload.typeOfList] : [...state[payload.typeOfList]].map((ele,idx)=> idx === payload.index ? payload.newValue : ele)
        }
      case 'Delete_Item':
        return {
          ...state,
          [payload.typeOfList] : [...state[payload.typeOfList]].filter((_,idx)=> idx !== payload.index)
        };
      case 'Move_Item':
        let copyOfFromList = [...state[payload.fromList]];
        let copyOfToList = [...state[payload.toList]];
        if(payload.fromList != payload.toList){
          copyOfToList.push(copyOfFromList[payload.index]);
        }
        copyOfFromList.splice(payload.index, 1);
        return {
          ...state,
          [payload.fromList] : [...copyOfFromList],
          [payload.toList] : [...copyOfToList]
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducerFn, initData);
  return (
    <>
      <Navbar/>
        <MyContext.Provider value={{ state, dispatch }}>
        <DndProvider backend={HTML5Backend}>
          <div className='cardList-container'>
            <CardList typeOfList={'Pending'} heading={'Pending'} />
            <CardList typeOfList={'InProgress'} heading={'In Progress'} />
            <CardList typeOfList={'Completed'} heading={'Completed'} />
          </div>
        </DndProvider>
      </MyContext.Provider>
      <Footer/>
    </>
    
  )
}

export default App
