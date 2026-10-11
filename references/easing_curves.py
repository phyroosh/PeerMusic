"""
Bespoke Easing Curves & Motion Physics for Manim
================================================
Engineered for industry-grade kinetic typography and music video motion design.
Eliminates robotic linear and naive smooth() interpolations in favor of
high-acceleration launches, spring damping, and aggressive Bézier decelerations.
"""

import math
from typing import Callable


def cubic_bezier(p1x: float, p1y: float, p2x: float, p2y: float) -> Callable[[float], float]:
    """
    Creates a cubic bezier easing function given control points (p1x, p1y) and (p2x, p2y),
    matching CSS cubic-bezier(p1x, p1y, p2x, p2y).
    Approximated via Newton-Raphson iteration for high performance at 60fps.
    """
    def curve(t: float) -> float:
        if t <= 0.0:
            return 0.0
        if t >= 1.0:
            return 1.0
        
        # Binary search / Newton-Raphson to solve for x(u) = t
        u = t
        for _ in range(8):
            # x(u) = 3*(1-u)^2 * u * p1x + 3*(1-u) * u^2 * p2x + u^3
            one_minus_u = 1.0 - u
            x_u = 3.0 * (one_minus_u ** 2) * u * p1x + 3.0 * one_minus_u * (u ** 2) * p2x + (u ** 3)
            dx_u = 3.0 * (one_minus_u ** 2) * p1x + 6.0 * one_minus_u * u * (p2x - p1x) + 3.0 * (u ** 2) * (1.0 - p2x)
            diff = x_u - t
            if abs(diff) < 1e-5:
                break
            if abs(dx_u) > 1e-5:
                u -= diff / dx_u
            else:
                break
            u = max(0.0, min(1.0, u))
        
        # Compute y(u)
        one_minus_u = 1.0 - u
        y_u = 3.0 * (one_minus_u ** 2) * u * p1y + 3.0 * one_minus_u * (u ** 2) * p2y + (u ** 3)
        return max(0.0, min(1.0, y_u))

    return curve


# -----------------------------------------------------------------------------
# Elite Production Presets
# -----------------------------------------------------------------------------

# Apple / Studio Dumbar signature aggressive decelerating snap:
# Starts with lightning velocity and gently locks into place with zero bounce.
EASE_OUT_EXPO = cubic_bezier(0.16, 1.0, 0.3, 1.0)

# Ultra-slick editorial ease for cinematic drift and camera glides:
EASE_CINEMATIC = cubic_bezier(0.25, 0.1, 0.25, 1.0)

# High-velocity whip-pan ease:
EASE_WHIP = cubic_bezier(0.7, 0.0, 0.3, 1.0)

# Snappy pop with gentle overshoot (useful for beat punch on kicks):
def ease_out_overshoot(overshoot: float = 1.4) -> Callable[[float], float]:
    """
    Over-travels target by `overshoot - 1.0` before settling cleanly.
    Ideal for word pop-ins and snare-drum typographic hits.
    """
    def curve(t: float) -> float:
        if t <= 0.0:
            return 0.0
        if t >= 1.0:
            return 1.0
        p = t - 1.0
        return p * p * ((overshoot + 1.0) * p + overshoot) + 1.0
    return curve

EASE_OVERSHOOT = ease_out_overshoot(1.35)


def damped_spring(frequency: float = 3.5, damping: float = 0.65) -> Callable[[float], float]:
    """
    Harmonic damped oscillator for physical micro-settling.
    Produces physical weight and organic mechanical elasticity.
    `frequency`: oscillations per unit time.
    `damping`: < 1.0 gives natural ringing that decays to zero.
    """
    omega = 2.0 * math.pi * frequency
    decay = damping * omega

    def curve(t: float) -> float:
        if t <= 0.0:
            return 0.0
        if t >= 1.0:
            return 1.0
        # Envelope: 1 - exp(-decay * t) * cos(omega * t)
        val = 1.0 - math.exp(-decay * t) * math.cos(omega * (1.0 - damping ** 2) ** 0.5 * t)
        return val

    return curve

EASE_SPRING = damped_spring(frequency=2.8, damping=0.6)


def rhythmic_pulse(beats: int = 1) -> Callable[[float], float]:
    """
    Generates an audio-reactive momentary scale pulse (1.0 -> 1.15 -> 1.0).
    """
    def curve(t: float) -> float:
        if t <= 0.0 or t >= 1.0:
            return 0.0
        return math.sin(t * math.pi * beats) ** 2
    return curve
