/** Customer for Lunchly */

const db = require("../db");
const Reservation = require("./reservation");

/** Customer of the restaurant. */

class Customer {
  constructor({ id, firstName, lastName, phone, notes }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.notes = notes;
  }

  // set and get phone function
  set phone(val) {
    if (val === null || (val.length < 10 || val.length > 14)){
      this._phone = null;
    } else {
    this._phone = val;
    }
    // this._phone = num || null;
  }

  get phone() {
    return this._phone;
  }

  // set and get notes
  set notes(val) {
    if (!this._notes) {
      this._notes = "";
    } else {
    this._notes = val;
    }
    // this._notes = val || "";
  }

  get notes() {
    return this._notes;
  }

  /** find all customers. */

  static async all() {
    const results = await db.query(
      `SELECT id, 
         first_name AS "firstName",  
         last_name AS "lastName", 
         phone, 
         notes
       FROM customers
       ORDER BY last_name, first_name`
    );
    return results.rows.map(c => new Customer(c));
  }

   /** top 10 customers. */

   static async topTen() {
    const results = await db.query(
      `SELECT first_name, last_name
      FROM reservations
      INNER JOIN customers ON customers.id = reservations.customer_id
      GROUP BY customer_id, first_name, last_name
      ORDER BY COUNT(*) DESC
      LIMIT 10;`
    );
    return results.rows.map(t => new Customer(t));
  }

  /** get a customer by ID. */

  static async get(id) {
    const results = await db.query(
      `SELECT id, 
         first_name AS "firstName",  
         last_name AS "lastName", 
         phone, 
         notes 
        FROM customers WHERE id = $1`,
      [id]
    );

    const customer = results.rows[0];

    if (customer === undefined) {
      const err = new Error(`No such customer: ${id}`);
      err.status = 404;
      throw err;
    }

    return new Customer(customer);
  }

  // make template select fullname 

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
  /** get all reservations for this customer. */

  async getReservations() {
    return await Reservation.getReservationsForCustomer(this.id);
  }

  /** save this customer. */

  async save() {
    if (this.id === undefined) {
      const result = await db.query(
        `INSERT INTO customers (first_name, last_name, phone, notes)
             VALUES ($1, $2, $3, $4)
             RETURNING id`,
        [this.firstName, this.lastName, this.phone, this.notes]
      );
      this.id = result.rows[0].id;
    } else {
      await db.query(
        `UPDATE customers SET first_name=$1, last_name=$2, phone=$3, notes=$4
             WHERE id=$5`,
        [this.firstName, this.lastName, this.phone, this.notes, this.id]
      );
    }
  }
}

module.exports = Customer;
