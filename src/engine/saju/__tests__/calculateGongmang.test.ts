import {
  calculateGongmang,
} from '../gongmang/calculateGongmang';

import type {
  BranchPosition,
} from '../types';
  
  
  describe('calculateGongmang', () => {
    it('갑자순의 공망은 술해이다', () => {
      const result = calculateGongmang(
        '甲',
        '子',
        [],
      );
  
      expect(result).toEqual({
        branches: ['戌', '亥'],
        hitPillars: [],
      });
    });
  
    it('갑술순의 공망은 신유이다', () => {
      const result = calculateGongmang(
        '己',
        '卯',
        [],
      );
  
      expect(result).toEqual({
        branches: ['申', '酉'],
        hitPillars: [],
      });
    });
  
    it('갑신순의 공망은 오미이다', () => {
      const result = calculateGongmang(
        '己',
        '丑',
        [],
      );
  
      expect(result).toEqual({
        branches: ['午', '未'],
        hitPillars: [],
      });
    });
  
    it('갑오순의 공망은 진사이다', () => {
      const result = calculateGongmang(
        '辛',
        '丑',
        [],
      );
  
      expect(result).toEqual({
        branches: ['辰', '巳'],
        hitPillars: [],
      });
    });
  
    it('갑진순의 공망은 인묘이다', () => {
      const result = calculateGongmang(
        '癸',
        '丑',
        [],
      );
  
      expect(result).toEqual({
        branches: ['寅', '卯'],
        hitPillars: [],
      });
    });
  
    it('갑인순의 공망은 자축이다', () => {
      const result = calculateGongmang(
        '戊',
        '午',
        [],
      );
  
      expect(result).toEqual({
        branches: ['子', '丑'],
        hitPillars: [],
      });
    });

    it('기축일주의 공망은 오미이다', () => {
        const branchPositions: BranchPosition[] = [
            {
              position: 'year',
              branch: '午',
            },
            {
              position: 'month',
              branch: '巳',
            },
            {
              position: 'day',
              branch: '丑',
            },
            {
              position: 'hour',
              branch: '戌',
            },
          ];
        
        const result = calculateGongmang(
          '己',
          '丑',
          branchPositions,
        );
      
        expect(result).toEqual({
            branches: ['午', '未'],
            hitPillars: ['year'],
          });
      });
  });