import Modal from './Modal';
import { useContext } from 'react';
import portfolioContext from './portfolioContext';
import './PortfolioAddForm.css'

function PortfolioAddForm() {

    const { onAddProfileModalOpen, showAddPortfolioModal } = useContext(portfolioContext);

    return(
        <div>
            <button
                className="openModalBtn"
                onClick={() => {
                    onAddProfileModalOpen(!showAddPortfolioModal)
                }}
            >
                Add Stocks
            </button>
            {showAddPortfolioModal && <Modal setOpenModal={onAddProfileModalOpen}/>}
        </div>
    );
}

export default PortfolioAddForm