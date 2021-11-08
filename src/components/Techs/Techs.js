import React from 'react';
import './Techs.css';
import './__TitleText/Techs__TitleText.css';
import './__Text/Techs__Text.css';

import Title from '../Title/Title.js';
import TechsTable from '../TechsTable/TechsTable.js';

function AboutProject() {
  return (
    <section className='Techs'>
      <Title title='Технологии' />
      <h3 className='Techs__TitleText'>7 технологий</h3>
      <p className='Techs__Text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <TechsTable></TechsTable>
    </section>
  )
}

export default AboutProject;