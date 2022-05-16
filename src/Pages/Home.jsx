import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Card } from "../components/Card";

export function Home () {
  const [ studentName, setStudentName ] = useState( '' );
  const [ students, setStudents ] = useState( [] );
  const [ user, setUser ] = useState( { name: '', avatar: '' } );


  function handleAddStudent () {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString( "pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      } )
    };

    setStudents( prevState => [ ...prevState, newStudent ] );
  };

  useEffect( () => {
    async function fetchData () {

      const response = await fetch( 'https://api.github.com/users/Juniokoi' );
      const data = await response.json();
      setUser( {
        name: data.name,
        avatar: data.avatar_url,
      } );
    }
    fetchData();
  }, [] );

  return (
    <div className="container max-w-xl flex flex-col items-center justify-center" >

      <header className="flex m-4 flex-row justify-between items-center w-full">

        <h1 className="text-xl font-bold" >Lista de presença</h1>

        <div className="flex flex-row items-center">
          <span>User:<br /> { user.name }</span>
          <img
            className="rounded-full m-4 max-w-[3rem]"
            src={ user.avatar }
            alt="Profile Picture" />
        </div>

      </header>
      <input
        className='w-full border-2 rounded h-10'
        type="text"
        name="nameInput"
        placeholder="Coloque um nome"
        id="nameInput"
        required
        onChange={ e => setStudentName( e.target.value ) }
      />

      <button
        className='w-full mb-10 text-white rounded h-10 m-1 bg-violet-500'
        onClick={ handleAddStudent }
        type="submit">
        Adicionar
      </button>

      {
        students.map( student =>
          <Card
            key={ uuidv4() }
            name={ student.name }
            time={ student.time }
          />
        )
      }
    </div>
  );
}