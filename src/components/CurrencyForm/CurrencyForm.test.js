import { render, screen, cleanup } from '@testing-library/react';
import CurrencyForm from './CurrencyForm';
import userEvent from '@testing-library/user-event';

describe('Component CurrencyForm', () => {
    it('should render without crashing', () => {
        render(<CurrencyForm action={() => {}} />);
    });
    it('should run action callback with proper data on form submit', () => {
        const action = jest.fn();
        const testCases = [
            { amount: '100', from: 'PLN', to: 'USD' },
            { amount: '20', from: 'USD', to: 'PLN' },
            { amount: '200', from: 'PLN', to: 'USD' },
            { amount: '345', from: 'USD', to: 'PLN' },
        ];
        for(const testObj of testCases){
            
            // render component
            render(<CurrencyForm action={action} />);

            // find “convert” button and data-testid
            const submitButton = screen.getByText('Convert');
            // find fields elems
            const amountField = screen.getByTestId('amount');
            const fromField = screen.getByTestId('from-field');
            const toField = screen.getByTestId('to-field');
            
            // set test values to fields
            userEvent.type(amountField, testObj.amount);
            userEvent.selectOptions(fromField, testObj.from);
            userEvent.selectOptions(toField, testObj.to);
            console.log('obj: ', testObj.amount)
            // simulate user click on "convert" button
            userEvent.click(submitButton);
           
            
            // check if action callback was called with proper argument
            
            expect(action).toHaveBeenCalledWith({ amount: Number(testObj.amount), from: testObj.from, to: testObj.to });
             // unmount component
             cleanup();
        };
        //check if action callback was called for all testCases
        expect(action).toHaveBeenCalledTimes(4);
    });
});