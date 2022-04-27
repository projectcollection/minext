import type { Student, _Class } from './appSlice';
import React, { useState } from 'react';

import Class from './Class';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  setName,
  login,
  logout,
  selectName,
  selectAuthed,
  selectUser,
  selectStudents,
  selectClasses,
} from './appSlice';
import styles from './App.module.css';

export function App() {
  const name: string = useAppSelector(selectName);
  const authed: boolean = useAppSelector(selectAuthed);
  const user: Student = useAppSelector(selectUser);
  const students: Student[] = useAppSelector(selectStudents);
  let classes: _Class[] = useAppSelector(selectClasses);

  let std_map: Map<string,string> = new Map();

  students.forEach(std => std_map.set(std.id, std.name));

  const dispatch = useAppDispatch();

  const handleLogin = () => {
      if (name.length == 0) return;
      dispatch(login(name));
  }
  const handleLogout = () => {
      dispatch(logout());
  }

  return (
    <div>
      <div className={styles.row}>
      {!authed ?
        <>
            <input
                value={name}
                onChange={e => dispatch(setName(e.target.value))}
                />
            <button
              className={styles.asyncButton}
              onClick={handleLogin}
            >
              login
            </button>
        </>
        :
        <>
            <p>{user.name}</p>
            <div className={styles.row}>
                {classes.map(_class => {
                    _class = {
                        ..._class, 
                        students: _class.students.map(
                            (std):string => std_map.get(std) || ""
                        )}
                    return <Class key={_class.name} {..._class}/>
                })}
            </div>
            <button
              className={styles.asyncButton}
              onClick={handleLogout}
            >
              logout
            </button>
        </>
      }

      </div>
    </div>
  );
}
