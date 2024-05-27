package org.example.sales_master.Repositories;

import org.example.sales_master.Entities.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientRepository extends JpaRepository<Client,Long> {
    List<Client> findByNomContaining(String name);
}
