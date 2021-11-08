import React from 'react';
import './AboutProject.css';
import './__Title/AboutProject__Title.css';
import './__Descriptions/AboutProject__Descriptions.css';

import Title from '../Title/Title.js';
import Description from '../Description/Description.js';
import TimeTable from '../TimeTable/TimeTable.js';

function AboutProject() {
  return (
    <section className='AboutProject'>
      <Title title='О проекте' />
      <div className='AboutProject__Descriptions'>
        <Description title='Дипломный проект включал 5 этапов' 
                     text='Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.'/>
        <Description title='На выполнение диплома ушло 5 недель' 
                     text='У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.'/>
      </div>
      <TimeTable></TimeTable>
    </section>
  )
}

export default AboutProject;