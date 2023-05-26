import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResultBox from './ResultBox';
import { convertUSDToPLN } from '../../utils/convertUSDToPLN';
import { convertPLNToUSD } from '../../utils/convertPLNToUSD';
import { Component, useState } from 'react';

  describe('Component ResultBox', () => {
    it('should render without crashing', () => {
        render(<ResultBox from='PLN' to='USD' amount={100} />);
    });
    it('should render proper info about conversion when PLN -> USD', () => {
        
        const testCases = [
            { amount: '100', from: 'PLN', to: 'USD' },
            { amount: '200', from: 'PLN', to: 'USD' },
            { amount: '845', from: 'PLN', to: 'USD' },
            { amount: '361', from: 'PLN', to: 'USD' },
        ];
        for(const testObj of testCases){
        render(<ResultBox from={testObj.from} to={testObj.to} amount={Number(testObj.amount)} />)

        const mainDiv = screen.getByTestId('mainDiv');

        const output = () => {
          const test = convertPLNToUSD(Number(testObj.amount));
          
          return test;
        }
        expect(mainDiv).toHaveTextContent(`PLN ${Number(testObj.amount)}.00 = ${output()}`);
        //expect(mainDiv).toContain(output);
        cleanup();    
    };
    });
    it('should render proper info about conversion when USD -> PLN', () => {
        const testCases = [
            { amount: '100', from: 'USD', to: 'PLN' },
            { amount: '200', from: 'USD', to: 'PLN' },
            { amount: '845', from: 'USD', to: 'PLN' },
            { amount: '361', from: 'USD', to: 'PLN' },
        ];
        for(const testObj of testCases){
            render(<ResultBox from={testObj.from} to={testObj.to} amount={Number(testObj.amount)} />)

            const mainDiv = screen.getByTestId('mainDiv');

            const output = () => {
                const test = convertUSDToPLN(testObj.amount);
                return test;
              }

              expect(mainDiv).toHaveTextContent(`$${Number(testObj.amount)}.00 = ${output()}`);
              cleanup();
            }
    });
    it('should render proper info about conversion when from = to', () => {
        const testCases = [
            { amount: '100', from: 'USD', to: 'USD' },
            { amount: '200', from: 'USD', to: 'USD' },
            { amount: '845', from: 'PLN', to: 'PLN' },
            { amount: '361', from: 'PLN', to: 'PLN' },
        ];
        
        for(const testObj of testCases){
            render(<ResultBox from={testObj.from} to={testObj.to} amount={Number(testObj.amount)} />);

            const mainDiv = screen.getByTestId('mainDiv');
            const currency = () => {
                if(testObj.from === 'USD'){
                    return '$';
                } else {
                    return 'PLN ';
                }
            }
            
            expect(mainDiv).toHaveTextContent(`${currency()}${testObj.amount}.00 = ${currency()}${testObj.amount}.00`);
            cleanup();
        }
    });
    it('should render text "Wrong value..." if input value is negative', () => {
        render(<ResultBox from='USD' to='PLN' amount={-10} />);

        const mainDiv = screen.getByTestId('mainDiv');

        expect(mainDiv).toHaveTextContent('Wrong value...');
    });
});