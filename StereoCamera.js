'use strict';

function StereoCamera(
    eyeSeparation,
    convergence,
    aspectRatio,
    FOV,
    nearClippingDistance,
    farClippingDistance
) {
    this.eyeSeparation = eyeSeparation;
    this.convergence = convergence;
    this.aspectRatio = aspectRatio;
    this.FOV = FOV;
    this.nearClippingDistance = nearClippingDistance;
    this.farClippingDistance = farClippingDistance;

    this.top = nearClippingDistance * Math.tan(FOV / 2);
    this.bottom = -this.top;

    this.a = aspectRatio * Math.tan(FOV / 2) * convergence;
    this.b = this.a - eyeSeparation / 2;
    this.c = this.a + eyeSeparation / 2;

    this.calcLeftFrustum = function () {
        let left = -this.b * this.nearClippingDistance / this.convergence;
        let right = this.c * this.nearClippingDistance / this.convergence;

        return m4.frustum(
            left,
            right,
            this.bottom,
            this.top,
            this.nearClippingDistance,
            this.farClippingDistance
        );
    };

    this.calcRightFrustum = function () {
        let left = -this.c * this.nearClippingDistance / this.convergence;
        let right = this.b * this.nearClippingDistance / this.convergence;

        return m4.frustum(
            left,
            right,
            this.bottom,
            this.top,
            this.nearClippingDistance,
            this.farClippingDistance
        );
    };
}