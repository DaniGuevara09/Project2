package co.edu.co.project2.persistence;

import co.edu.co.project2.logic.Expense;

import java.io.IOException;

public class ExpenseDAO implements InterfaceDAO<Expense>{

    // Para que no saliera error
    @Override
    public void close() throws IOException {

    }
}
