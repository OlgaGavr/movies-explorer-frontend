import './InfoTolltip.css';
import './_Opened/InfoTolltip_Opened.css';
import './__Caption/InfoTolltip__Caption.css';
import './__Container/InfoTolltip__Container.css';
import '../Button/Button.css';
import '../Button/_Action/Button_Action_Close.css';

function InfoTolltip({ isOpen, closePopups }) {
    const caption= 'Вы успешно изменили свои данные!';
    return (
      <article className={`InfoTolltip ${isOpen ? 'InfoTolltip_Opened' : ' '}`}>
        <div className="InfoTolltip__Container">
            <div className="InfoTolltip__Caption">{caption}</div>
            <button type="button" className="Button Button_Action_Close" aria-label="закрыть" onClick={closePopups}></button>
        </div>
      </article>
    )
  }
  
  export default InfoTolltip;