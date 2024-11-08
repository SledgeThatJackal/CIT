package dev.adamico.cit;

public class Views {
    public interface Exclusive {}

    public interface Inclusive {}

    public interface ExclusiveID extends Exclusive {}

    public interface ExclusiveObject extends Exclusive {}

    public interface InclusiveID extends Inclusive, ExclusiveID {}

    public interface InclusiveObject extends Inclusive, ExclusiveObject {}
}
