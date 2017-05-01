import {
  assert
} from 'chai';

import {
  map,
  has,
  filter
} from 'lodash';

/*
 * To simplify our model, we will define the components of a desire
 * as such:
 * - a person
 * - a state of the world 1 (the current state of the world for this person)
 * - a state of the world 2 (the state of the world after the person has
 * satisfied the desire)
 */

class StateOfTheWorld {
  /**
   * A StateOfTheWorld is a framework of data centered around a specific person.
   * It contains her/his basic needs, a list of his potential desires and lists
   * of the state of the world now and after satisfaction of the desire for all
   * the people whose life has been affected (i.e. whose state of the world has
   * been causally modified by the realization of the desire of the person).
   * and a list
   * of all the external facts pertinent for ascertaining the rational
   * desirability of the desire.
   * -
   * @param  {Array} potentialDesiresOfPerson  - An array of the potential
   * informed desire of the user.
   * @param  {Object} needsOfPerson - An object of the basic needs of the person
   * @param  {Array} currentSOTWOther - An array of objects of class StateOfTheWorld
   * that contains the state of the world for all the other people whose state of
   * the world has changed because of the satisfaction of the desire of the person.
   * @param  {Array} resultSOTWOther - An array of objects of class StateOfTheWorld
   * after the desire has been satisfied.
   * @return {Object}
   */
  constructor(
    potentialDesiresOfPerson,
    needsOfPerson,
    currentSOTWOther,
    resultSOTWOther) {
    // An array of desires, i.e. for each desire the current StateOfTheWorld and
    // the wished for StateOfTheWorld.
    this.potentialDesiresOfPerson = potentialDesiresOfPerson;
    if (this.haveBasicNeeds(needsOfPerson)) {
      this.needsOfPerson = needsOfPerson;
    }
    /* A (potentially infinite) list of external facts relevant for ascertaining
     * rationality and reasonability test for the desire. For simplicity, it will
     * not play a role in our model.
     * this.externalFacts = externalFacts;
     */
    this.currentSOTWOther = currentSOTWOther;
    this.resultSOTWOther = resultSOTWOther;
  }

  /**
   * A non exhaustive list of needs that must be satisfied as a precondition
   * for any desire.
   *
   * @type {Array}
   */
  const BASIC_NEEDS = [
    'hunger',
    'thirst',
    'health',
    'security',
    'housing'
  ];

  /**
   * Set default value of the basic needs as a median satisfaction value.
   * 0 being complete deprivation, 10 meaning complete satisfaction.
   * @type {Object}
   */
  const BASIC_NEEDS_DEFAULT = {
    hunger: 5
    thirst: 5,
    health: 5,
    security: 5,
    housing: 5
  };

  /**
   * Set default value of the basic needs as a median satisfaction value.
   * 0 being complete deprivation, 10 meaning complete satisfaction.
   * @type {Object}
   */
  const EXAMPLE_LIST_OTHER_DESIRE = [
    /* Here we use the shortened syntax for stateOfTheWorld1: stateOfTheWorld1.
    * Each object having two properties, one for the current state of the
     * world (an object of class StateOfTheWorld) and one for the wished for
     * state of the world (an other object of the same class with different
     * data).
     */
    {
      currentStateOfTheWorld,
      stateOfTheWorldDesired1
    },
    {
      currentStateOfTheWorld,
      stateOfTheWorldDesired2
    }
  ];

  /**
   * Checks that the needs of the person include the basic needs.
   * @param {Object} needs - An object with the needs of the user and their
   * value.
   * The basic needs of object BASIC_NEEDS_DEFAULT must be present in the
   * needs object.
   */
  haveBasicNeeds(needs = BASIC_NEEDS_DEFAULT) {
    // Loop on needs array
    if (has(needs, this.BASIC_NEEDS)) {
      return true;
    };
    return false;
  }

  /** Checks the existence test, i.e. the internal validity of the desire (is
   * it a desire about a real and coherent object?)
   * @param  {Object} currentStateOfTheWorld - An object of class StateOfTheWorld.
   * Models the current state of the world for the person before the desire has
   * beeen satisfied.
   * @param  {Object} wishedStateOfTheWorld - An object of class StateOfTheWorld.
   * Models what is the state of the world that is aimed at / desired by the
   * person.
   */
  isValidDesire(currentStateOfTheWorld, wishedStateOfTheWorld) {
    if (!isObject(currentStateOfTheWorld) ||
      !isObject(wishedStateOfTheWorld) ||
      !(wishedStateOfTheWorld instanceof StateOfTheWorld) ||
      !(currentStateOfTheWorld instanceof StateOfTheWorld)
   ) {
      throw new Error('Fail the existence test.');
    }
  }

  /** Checks the rationality test, i.e. the non contradiction between the
   * wished for state of the world and the basic needs and potential long term
   * desires of the person.
   * @param  {Object} currentStateOfTheWorld - An object of class StateOfTheWorld.
   * @param  {Object} wishedStateOfTheWorld - An object of class StateOfTheWorld.
   */
  isRationalDesire(currentStateOfTheWorld, wishedStateOfTheWorld) {
    /* The number of potential (informed) desires of the user should not be
    * inferior after the desire has been satisfied.
    * Example: I have at last bought the new shiny sport car I desired, but my
    * family and me are now forced to live in a trailer and medical care is too
    * expensive. The list of potential desires of the person will have in fact
    * decreased after the satisfaction of the desire (e.g. a desire for decent
    * long-term economical situation).
    */
    if(wishedStateOfTheWorld.potentialDesiresOfPerson.length <
      currentStateOfTheWorld.potentialDesiresOfPerson.length) {
      return false;
    }

    map(currentStateOfTheWorld.needsOfPerson, (value, key) => {
      // If at least one of the needs' basic value has decreased, the desire is
      // not rational. It is a strongly prudential version of informed desire
      // theory where basic needs have a very important role (based on the
      // intuition that the basic needs are quasi conditions for any informed
      // desire possibility). Of course, other variant are possible.
      if (value > wishedStateOfTheWorld.needsOfPerson[key]) {
    	   return false;
       }
     });
  }


  /** Checks the reasonability test, i.e. the non contradiction between the
   * wished for state of the world and the basic needs and potential long term
   * desires of other people.
   * @param  {Object} wishedSOTWPerson - An object of class StateOfTheWorld.
   * @param  {Array} resultSOTWOther - An array of objects of class StateOfTheWorld.
   */
  isReasonableDesire(currentSOTWOther, resultSOTWOther) {
    // Here we would ideally compare in each array all the states of the world
    // before and after the satisfaction of the desire of the person to see if
    // any one of the person is worse off. It is a comprehensive and drastic view.
  }
}
