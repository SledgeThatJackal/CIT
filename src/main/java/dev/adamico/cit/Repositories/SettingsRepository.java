package dev.adamico.cit.Repositories;

import dev.adamico.cit.Models.Setting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SettingsRepository extends JpaRepository<Setting, Long> {
    Optional<String> findValueByKey(String key);

    @Modifying
    @Query("UPDATE Setting s SET s.value = :value WHERE s.key = :key")
    void updateValueByKey(@Param("key") String key,
                          @Param("value") String value);
}
