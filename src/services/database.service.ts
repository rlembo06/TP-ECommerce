import { Injectable } from '@angular/core';

//import mysql from 'mysql2';
//var mysql = require('mysql2');

//var mysql = require('mysql');
import mysql from 'mysql';

@Injectable()
export class DatabaseService {

  private host: string = "localhost";
  private user: string = "root";
  private password: string = "root";
  private database: string = "ecommerce";
  public connection = null;

  constructor() {
    this.connection = mysql.createConnection({
      host     : "localhost",
      user     : "root",
      password : "root",
      database : "ecommerce"
    });
  }

  public Access() {

    return mysql.createConnection({
      host     : "localhost",
      user     : "root",
      password : "root",
      database : "ecommerce"
    });

  }
  
  /*
  public connection = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    password : "root",
    database : "ecommerce"
  });
  */

  /*
  public connection = mysql.createConnection({
    host     : this.host,
    user     : this.user,
    //password : this.password,
    database : this.database
  });
  */
}
