import { assert } from 'chai';


class Experience {
  /**
   * Epxerience is defined by pain and pleausure. We take into account the quality
   * of the pleasure experiences, following J.S. Mill
   * @param  {Number} pain             [description]
   * @param  {Number} pleasureQuantity [description]
   * @param  {Number} pleasureQuality  [description]
   * @return {Object}
   */
  constructor(pain, pleasureQuantity, pleasureQuality) {
    this.pain.quantity = this.limitExperienceValue(pain);
    this.pleasure.quantity = this.limitExperienceValue(pleasureQuantity);
    this.pleasure.quality = this.limitExperienceValue(pleasureQuality);
    this.qualityModfier = 2;
  }


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
