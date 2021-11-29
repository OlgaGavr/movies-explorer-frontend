import './InfoTolltip.css';
import './_Opened/InfoTolltip_Opened.css';
import './__Caption/InfoTolltip__Caption.css';
import './__Container/InfoTolltip__Container.css';
import '../Button/Button.css';
import '../Button/_Action/Button_Action_Close.css';
import '../InfoTolltip/__Error/InfoTolltip__Error.css';
import '../InfoTolltip/__Success/InfoTolltip__Success.css';

function InfoTolltip({ isOpen, isSuccess, closePopups, caption }) {
  //const caption= isSuccess ? 'Вы успешно изменили свои данные!' : 'Что-то пошло не так! Попробуйте ещё раз.';
   
    return (
      <article className={`InfoTolltip ${isOpen ? 'InfoTolltip_Opened' : ' '}`}>
        <div className="InfoTolltip__Container">
          <div className={`${isSuccess ? 'InfoTolltip__Success' : 'InfoTolltip__Error'}`} alt={`${isSuccess ? 'Галочка' : 'Крестик'}`} />
          <div className="InfoTolltip__Caption">{caption}</div>
          <button type="button" className="Button Button_Action_Close" aria-label="закрыть" onClick={closePopups}></button>
        </div>
      </article>
    )
  }
  
  export default InfoTolltip;