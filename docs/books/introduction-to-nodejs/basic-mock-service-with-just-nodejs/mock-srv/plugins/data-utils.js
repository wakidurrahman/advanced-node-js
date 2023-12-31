"use strict";

import fp from "fastify-plugin";

const categoryToPrefix = {
  electronics: "E",
  confectionery: "C",
};

/**
 * The function takes an existing set of IDs, finds the highest ID, increments it by 1, and combines it with a provided prefix to generate a new ID.
 * It ensures uniqueness by removing duplicates before determining the next ID value.
 * @param {*} idPrefix
 * @param {*} data
 * @returns
 */
const calculateID = (idPrefix, data) => {
  /**
   * The function starts by extracting unique IDs from the data array and storing them in a variable called sorted.
   * It ensures that there are no duplicate IDs by removing any duplicates using new Set().
   */
  const sorted = [...new Set(data.map(({ id }) => id))];
  /**
   * The code retrieves the last ID from the sorted array.
   * It assumes that the IDs are formatted in a specific way, with a prefix followed by a numeric value.
   * The code removes the prefix by slicing off the first character and converts the remaining numeric portion into a number.
   * The code increments the extracted number by 1 to calculate the next ID value.
   */
  const next = Number(sorted.pop().slice(1)) + 1;

  /**
   * Finally, the function constructs a new ID string by combining the idPrefix and the calculated next value.
   * Using string interpolation to concatenate the two values together.
   */
  return `${idPrefix}${next}`;
};

export default fp(async (fastify, opts) => {
  /**
   * decorators
   * We use the `fastify.decorateRequest` method to decorate the request object that is passed to route handler functions with a method we name mockDataInsert.
   *
   * @param {request} request
   * @param {string} category
   * @param {data[]} data // The data that is expected is an array of mocked
   * @returns {Object}
   */

  fastify.decorate("mockDataInsert", (request, category, data) => {
    const { body } = request;
    const idPrefix = categoryToPrefix[category];
    const id = calculateID(idPrefix, data);
    const convertStringToObj = Object.assign({}, { id }, JSON.parse(body));
    data.push(convertStringToObj);
    return data;
  });
});
