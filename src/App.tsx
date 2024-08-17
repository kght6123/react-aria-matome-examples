import './App.css'

import CustomButton from './components/introduction/CustomButton'
import CustomComboBox from './components/introduction/CustomComboBox'

function App() {
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <CustomButton />
      </div>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <CustomComboBox />
      </div>
    </>
  )
}

export default App
