/** Reservation for Lunchly */

const moment = require("moment");

const db = require("../db");


/** A reservation for a party */

class Reservation {
  constructor({id, customerId, numGuests, startAt, notes}) {
    this.id = id;
    this.customerId = customerId;
    this.numGuests = numGuests;
    this.startAt = startAt;
    this.notes = notes;
  }

  // get and set for number of guests min 1
  set numGuests(val){
    if (val < 1) {
      throw new Error("Can't reserve for nobody, have at least 1 guest");
    }
    this._numGuests = val;
  }
  get numGuests() {
    return this._numGuests;
  }

  // get and set startAt ftrom start date (make sure it uses correct object)
  set startAt(val) {
    // make sure that the Date protptype works (instanceof)
    if(!isNaN(val) && (val instanceof Date)) {
      this._startAt = val
    } else {
      throw new Error("Not a valid startAt input")
    }
  }
  get startAt() {
    return this._startAt;
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

  // get and set to make sure customer can only get 1 ID for lunch.ly

  set customerId(val) {
    // check that you're getting a customerId in addtion to checking the value
    if (this._customerId && this._customerId !== val){
      throw new Error("Only 1 ID per customer, cannot change ID")
    }
    this._customerId = val;
  }
  get customerId() {
    return this._customerId;
  }
  /** formatter for startAt */

  getformattedStartAt() {
    return moment(this.startAt).format('MMMM Do YYYY, h:mm a');
  }

  /** given a customer id, find their reservations. */

  static async getReservationsForCustomer(customerId) {
    const results = await db.query(
          `SELECT id, 
           customer_id AS "customerId", 
           num_guests AS "numGuests", 
           start_at AS "startAt", 
           notes AS "notes"
         FROM reservations 
         WHERE customer_id = $1`,
        [customerId]
    );

    return results.rows.map(row => new Reservation(row));
  }

  // save reservations

  async save() {
    if (this.id === undefined) {
      const result = await db.query(
        `INSERT INTO reservations (customer_id, num_guests, start_at, notes)
             VALUES ($1, $2, $3, $4)
             RETURNING id`,
        [this.customerId, this.numGuests, this.startAt, this.notes]
      );
      this.id = result.rows[0].id;
    } else {
      await db.query(
        `UPDATE reservations SET num_guests=$1, start_at=$2, notes=$3
             WHERE id=$4`,
        [this.numGuests, this.startAt, this.notes, this.id]
      );
    }
  }
}


module.exports = Reservation;
