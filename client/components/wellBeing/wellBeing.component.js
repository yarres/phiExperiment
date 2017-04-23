import angular from 'angular';
import { isObject } from 'lodash';

export class wellBeingComponent {

  /**
   * Epxerience is defined by pain and pleausure. We take into account the quality
   * of the pleasure experiences, following J.S. Mill
   * @param  {Number} pain             [description]
   * @param  {Number} pleasureQuantity [description]
   * @param  {Number} pleasureQuality  [description]
   * @return {Object}
   */
   /* @ngInject */
  constructor(pain, pleasureQuantity, pleasureQuality) {
    this.pain.quantity = this.limitExperienceValue(pain);
    this.pleasure.quantity = this.limitExperienceValue(pleasureQuantity);
    this.pleasure.quality = this.limitExperienceValue(pleasureQuality);
    this.qualityModfier = 2;
    this.experienceLimitValue = 10;
    /* Without taking into account past experience we define the default level of
    * experience to be neutral.
    */
    this.wellBeingValue = 0;
  }

  /**
   * We limit the field of experience to
   * @param  {Number} experienceValue [description]
   * @return {Number}            [description]
   */
  limitExperienceValue(experienceValue) {
    const tempExpValue = Math.abs(experienceValue);
    return tempExpValue > this.experienceLimitValue
    ? this.experienceLimitValue
    : tempExpValue;
  }

  /** An experience that doesn't increase pain nor pleasure doesn't affect the
   * user well-being
   * @param  {Experience} experience
  */
  getWellBeingValue(experience) {
    if (!isObject(experience) && !(experience instanceof wellBeingComponent)) {
      throw new Error('This experience doesn\'t enter our model');
    }
    // Well-being is positive
    const isPositivePleasurePainRatio = experience.pleasure.quantity > experience.pain.quantity;

    // Well-being is positive
    if (isPositivePleasurePainRatio) {
      /**
       * Following J.S. Mill type of hedonism, quality has an impact on
       *  well-being
       */
      this.wellBeingValue = 1 * experience.pleasure.quality;
    } else {
      /* Well-being is negative or neutral (equal to 0) if the pain quantity of the
      * experience is equal to or superior to the pleasure quantity
      * The quality modifier is not applied when the pleasure quantity is lower
      * than the pain quantity, modeling the fact that avoiding pain is a priority
      * over gaining higher quality pleasures.
      */
      this.wellBeingValue = experience.pleasure.quantity - experience.pain.quantity;
    }
  }
}

/**
 * Some tests to assert the logic of the model.
 */

import { assert } from 'chai';
// Create a new experience
  describe('Experience', () => {
    it('returned well-being value should be positive and equal to 1', () => {
      const exp = new WellBeingComponent(0,1,1);
      const wellBeingValue = exp.getWellBeingValue();
      assert.equal(wellBeingValue, 1);
    });
    it('returned well-being value should be negative (more pain than pleasure) and equal to -4', () => {
      const exp = new Experience(5,1,1);
      const wellBeingValue = exp.getWellBeingValue();
      assert.equal(wellBeingValue, -4);
    });
  });


export default angular.module('phiExperimentApp.wellBeing', [])
  .component('wellBeing', {
    template: '<h1>We {{ $ctrl.message }}</h1>',
    bindings: { message: '<' },
    controller: wellBeingComponent
  })
  .name;
