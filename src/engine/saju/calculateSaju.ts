import { calculateWithLunarLibrary } from './adapters/lunarAdapter';

import { calculateGongmang } from './gongmang/calculateGongmang';

import {
  calculateElementCount,
  getBranchElement,
  getStemElement,
} from './element';

import {
  calculateTenGod,
  getStemYinYang,
} from './tenGod';

import {
  calculateHiddenStems
} from './hiddenStem';

import {
  calculateTwelveLifeStage,
} from './twelveLifeStage';

import type {
  BranchPosition,
  SajuInput,
  SajuResult
} from './types';

import type {
  Pillar,
} from './types';
  
function createEnrichedPillar(
    pillar: Pillar,
    dayStem: string,
  ): Pillar {
    const hiddenStems =
      calculateHiddenStems(
        dayStem,
        pillar.branch,
      );
  
    const mainHiddenStem =
      hiddenStems.find(
        item => item.role === 'main',
      );
  
    return {
      ...pillar,
  
      stemElement: getStemElement(
        pillar.stem,
      ),
  
      branchElement: getBranchElement(
        pillar.branch,
      ),
  
      stemYinYang: getStemYinYang(
        pillar.stem,
      ),
  
      stemTenGod: calculateTenGod(
        dayStem,
        pillar.stem,
      ),
  
      hiddenStems,
  
      branchMainStem:
        mainHiddenStem?.stem,
  
      branchTenGod:
        mainHiddenStem?.tenGod,

      twelveLifeStage:
        calculateTwelveLifeStage(
          dayStem,
          pillar.branch,
        ),
    };
}

export function calculateSaju(
  input: SajuInput,
): SajuResult {

  const hour = input.unknownTime
    ? 12
    : input.hour ?? 0;

  const minute = input.unknownTime
    ? 0
    : input.minute ?? 0;

  const calculated = calculateWithLunarLibrary({
    calendarType: input.calendarType,
    isLeapMonth: input.isLeapMonth,

    year: input.year,
    month: input.month,
    day: input.day,

    hour,
    minute,
  });

  const dayStem =
  calculated.dayPillar.stem;

const yearPillar =
  createEnrichedPillar(
    calculated.yearPillar,
    dayStem,
  );

const monthPillar =
  createEnrichedPillar(
    calculated.monthPillar,
    dayStem,
  );

const dayPillar =
  createEnrichedPillar(
    calculated.dayPillar,
    dayStem,
  );

const timePillar =
  input.unknownTime
    ? undefined
    : createEnrichedPillar(
        calculated.timePillar,
        dayStem,
      );

const pillars = [
            yearPillar,
            monthPillar,
            dayPillar,
            ...(timePillar ? [timePillar] : []),
          ];
          
const elementCount = calculateElementCount(pillars);

const branchPositions: BranchPosition[] = [
              {
                position: 'year',
                branch: yearPillar.branch,
              },
              {
                position: 'month',
                branch: monthPillar.branch,
              },
              {
                position: 'day',
                branch: dayPillar.branch,
              },
            ];
            
            if (timePillar) {
              branchPositions.push({
                position: 'time',
                branch: timePillar.branch,
              });
            }

  const gongmang = calculateGongmang(
              dayPillar.stem,
              dayPillar.branch,
              branchPositions,
            );

  return {
    input,

    solarDate: calculated.solarDate,
    lunarDate: calculated.lunarDate,

    yearPillar,
    monthPillar,
    dayPillar,
    timePillar,

    elementCount,

    gongmang,
  };
}