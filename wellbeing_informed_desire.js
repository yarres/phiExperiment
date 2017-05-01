import { assert } from 'chai';

import { map, has } from 'lodash';


class StateOfTheWorld {
  /**
   * To define an informed desire framework we need an ideal subject x
   * in a state of affair S. x
   * x wants that S' happens while S's satisfy the following criteria:
   * - S' is reali
   * -
   * @param  {Array} potentialDesiresOfUser  - An array of the potential
   * informed desire of the user.
   * @param  {Array} needsOfUser - An array of the basic needs of the user
   * @return {Object}
   */
  constructor(potentialDesiresOfUser, needsOfUser, externalFacts) {
    this.potentialDesiresOfUser = potentialDesiresOfUser;
    if (this.haveBasicNeeds(needsOfUser)) {
      this.needsOfUser = needsOfUser;
    }
    this.externalFacts = externalFacts;
  }

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
     * @type {Array}
     */
    const BASIC_NEEDS_DEFAULT = [
      hunger: 5
      thirst: 5,
      health: 5,
      security: 5,
      housing: 5
    ];

    /**
     * Checks that the needs the needs of the user
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

    // TODO: faire la même chose pour le setter des desires (voir comment)
    // et celui des external facts (objet avec quelques propriétés comme situation financière, psychologique, relationnelle, etc.)


  /**
   * Exception handling, we only calculate well-being from experiences
   * @param {String} message The exception message
   */
  ExperienceException(message) {
    this.message = message;
    this.name = 'ExperienceException';
  }
  /**
   * [limitExperience description]
   * @param  {Number} experienceValue [description]
   * @return {Number}            [description]
   */
  limitExperienceValue(experienceValue) {
    const tempExpValue = Math.abs(experienceValue);
    return tempExpValue > 10 ? 10 : tempExpValue;
  }

  /** An experience that doesn't increase pain nor pleasure doesn't affect the
   * user well-being
   * @param  {Experience} experience
  */
  getWellBeingValue(experience) {
    if (!_.isObject(experience) && !(experience instanceof Experience)) {
      throw new ExperienceException('This experience doesn\'t enter our model');
    }
    // Well-being is positive
    const isPositiveWellBeing = experience.pleasure.quantity > experience.pain.quantity;

    // Well-being is positive
    if (isPositiveWellBeing) {
      /**
       * Following J.S. Mill type of hedonism, quality has an impact on
       *  well-being
       */
      return 1 * experience.pleasure.quality;
    }
    /* Well-being is negative or neutral (equal to 0) if the pain quantity of the
    * experience is equal to or superior to the pleasure quantity
    * The quality modifier is not applied when the pleasure quantity is lower
    * than the pain quantity, modeling the fact that avoiding pain is a priority
    * over gaining higher quality pleasures.
    */
    return experience.pleasure.quantity - experience.pain.quantity;
  }
}


    // Create a new experience
describe('Experience', () => {
  it('returned well-being value should be positive and equal to 1', () => {
    const exp = new Experience(0, 1, 1);
    const wellBeingValue = exp.getWellBeingValue();
    assert.equal(wellBeingValue, 1);
  });
  it('returned well-being value should be negative (more pain than pleasure) and equal to -1', () => {
    const exp = new Experience(5, 1, 1);
    const wellBeingValue = exp.getWellBeingValue();
    assert.equal(wellBeingValue, 1);
  });
});
