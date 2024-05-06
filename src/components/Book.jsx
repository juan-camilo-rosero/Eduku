import { useContext } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { SectionContext } from "../context/SectionContext";
import { BooksContext } from "../context/BooksContext";
import { UserContext } from "../context/UserContext";
import { AlertContext } from "../context/AlertContext";

function Book() {
  const {book, setBook, setAlertDiv} = useContext(SectionContext)
  const {title, content, actualBook, books, setBooks} = useContext(BooksContext)
  const {points, setPoints, streak, streakDate, setStreak, setStreakDate, formatDate} = useContext(UserContext)
  const {setMessage, setImg} = useContext(AlertContext)

  const handleCompleted = () => {
    const booksArr = books;
    const newPoints = (booksArr[actualBook].read) ? 25 : 50
    setPoints(points + newPoints)
    if(streakDate !== formatDate(new Date())){
      setMessage(`You extended your streak and won ${newPoints} points!!!`)
      setImg(`fire.png`)
      setStreak(streak + 1)
      setStreakDate(formatDate(new Date()))
    }
    else{
      setMessage(`You won ${newPoints} points!!!`)
      setImg(`treasure.png`)
    }
    setAlertDiv(true)
    booksArr[actualBook].read = true
    setBooks(booksArr)
    setBook(false)
  }
    
  return (
    <div className={`fixed h-screen bg-blue-darker w-full left-0 border-t-4 border-blue-turquoise z-40 flex flex-col items-center pt-32 px-6 gap-16 overflow-y-scroll pb-12 transition-all md:px-16 lg:px-24 lg:pt-28 ${(book)
        ? "bottom-0"
        : "-bottom-[150vh]"
    }`}>
        <RiCloseCircleLine className="fixed right-6 -mt-0 text-blue-turquoise text-4xl bg-blue-darker rounded-full cursor-pointer md:right-14 lg:right-20 lg:-mt-0 lg:text-5xl" onClick={() => setBook(false)}/>
        <h2 className="text-center w-4/5 md:w-full text-light text-3xl font-semibold md:text-4xl">{title}</h2>
        <p className="text-justify text-medium text-xl md:leading-8 lg:w-2/3">{content}</p>
        <button className="w-full py-2 bg-blue-turquoise transition-all hover:bg-blue-turquoiseHover text-blue-darker text-2xl rounded-xl font-semibold md:w-1/3 lg:w-1/4" onClick={() => handleCompleted()}>done</button>
    </div>
  )
}

export default Book