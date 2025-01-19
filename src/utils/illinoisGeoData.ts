import type { Feature, Geometry } from 'geojson';

export const illinoisOutline: Feature = {
  type: 'Feature',
  properties: {},
  geometry: {
    type: 'Polygon',
    coordinates: [[
      [-91.513079, 40.634033],
      [-90.639984, 41.528796],
      [-87.802482, 41.759445],
      [-87.523661, 41.759445],
      [-87.523661, 38.742481],
      [-88.071564, 37.937757],
      [-89.167427, 37.038997],
      [-89.705036, 37.038997],
      [-91.513079, 40.634033]
    ]]
  }
};