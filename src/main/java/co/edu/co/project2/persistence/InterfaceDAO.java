package co.edu.co.project2.persistence;

import java.io.Closeable;
import java.util.List;

public interface InterfaceDAO<T> extends Closeable {
    List<T> getAll();
    T save( T object );
}
