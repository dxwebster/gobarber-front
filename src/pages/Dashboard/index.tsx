import React, { useState, useCallback, useEffect, useMemo } from 'react';
import 'react-day-picker/lib/style.css';
import ptBR from 'date-fns/locale/pt-BR';
import DayPicker, { DayModifiers } from 'react-day-picker';
import { FiClock, FiPower } from 'react-icons/fi';
import { isToday, format, parseISO, isAfter } from 'date-fns';
import { useAuth } from '../../hooks/auth';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import { Container, Header, HeaderContent, Profile, Content, Schedule, Calendar, NextAppointment, Section, Appointment } from './styles';

interface monthAvailabilityItem {
  day: number;
  available: boolean;
}

interface Appointment {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  // função de autenticação para  usar no botão de sair e deslogar
  const { signOut, user } = useAuth();

  const [selectedDate, setselectedDate] = useState(new Date()); //  armazena a data selecionada, começa com o dia de hoje selecionado
  const [currentMonth, setCurrentMonth] = useState(new Date()); // armazena o mês selecionado, começa com o mês atual selecionado
  const [monthAvailability, setmonthAvailability] = useState<monthAvailabilityItem[]>([]); // armazena  a disponibilidade dos dias do mês
  const [appointments, setAppointments] = useState<Appointment[]>([]); // armazena os appointments buscados

  // onDayChange é um função do Colorpicker que ao acionar, executa alaguma coisa
  // Neste caso, estamos pegando o dia de hoje,  e armazenando na variável 'selectedDate'
  // Como queremos disparar uma função, então utilizamos o useCallback, pois é uma função dentro de uma função
  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setselectedDate(day);
    }
  }, []);

  // onMonthChange é um função do Colorpicker que ao acionar, executa alaguma coisa
  // Neste caso, estamos pegando o mês atual, e armazenando na variável 'currentMonth'
  // Como queremos disparar uma função, então utilizamos o useCallback, pois é uma função dentro de uma função
  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []); // aqui irá executar apenas uma vez, sem dependências de variáveis

  // Toda vez que o mês atual mudar, quero disparar uma função
  // A função vai ser a busca no back-end da disponibilidade dos dias do mês
  // Para controlar esse disparo de funções, vamos usar o useEffect
  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then((response) => {
        setmonthAvailability(response.data); // armazeno na monthAvailability a resposta da api
      });
  }, [currentMonth, user.id]); // quando qualquer uma dessas variáveis mudar, vai fazer uma busca na api novamente

  // Vamos fazer a busca na api toda vez que a data selecionada mudar
  // A função vai ser a busca na api de todos os appointments daquele dia selecionado
  // Para controlar esse disparo de funções, vamos usar o useEffect
  useEffect(() => {
    api
      .get<Appointment[]>('/appointments/me', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then((response) => {
        const appointmentsFormatted = response.data.map((appointment) => {
          return {
            ...appointment,
            hourFormatted: format(parseISO(appointment.date), 'HH:mm'), // formato a data vinda da api pra poder exibir na tela
          };
        });
        setAppointments(appointmentsFormatted); // armazena nos 'appointments' a resposta da api já formatada
      });
  }, [selectedDate]);

  // Vamos fazer um map nos dados que vieram da api e selecionar apenas os que estão com available false
  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter((monthDay) => monthDay.available === false)
      .map((monthDay) => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        return new Date(year, month, monthDay.day);
      });
    return dates;
  }, [currentMonth, monthAvailability]); // quando qualquer uma dessas variáveis mudar, vai executar a formatação das datas novamente

  // Aqui, toda vez que a data selecionada mudar, faz uma formatação
  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", { locale: ptBR });
  }, [selectedDate]);

  // Aqui tambem, toda vez que a data selecionada mudar, faz uma formatação pra dia da semana
  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', { locale: ptBR });
  }, [selectedDate]);

  // Aqui, toda vez que os agendamentos mudarem, vamos retornar os agendamentos da manhã
  const morningAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      return parseISO(appointment.date).getHours() < 12;
    });
  }, [appointments]);

  // Aqui, toda vez que os agendamentos mudarem, vamos retornar os agendamentos da tarde
  const afternoonAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      return parseISO(appointment.date).getHours() >= 12;
    });
  }, [appointments]);

  // Aqui vou pegar o primeiro agendamento que seja depois do horario atual
  // Pra isso, converto a data de string para formato data com o parseISO e uso o isAfter do datefns para comparar com a data/horário atual
  const nextAppointment = useMemo(() => {
    return appointments.find((Appointment) => isAfter(parseISO(Appointment.date), new Date()));
  }, [appointments]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem-vindo,</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>

          {isToday(selectedDate) && nextAppointment && (
            <NextAppointment>
              <strong>Agendamento a seguir</strong>
              <div>
                <img src={nextAppointment.user.avatar_url} alt={nextAppointment.user.name} />
                <strong>{nextAppointment.user.name}</strong>
                <span>
                  <FiClock />
                  {nextAppointment.hourFormatted}
                </span>
              </div>
            </NextAppointment>
          )}

          <Section>
            <strong>Manhã</strong>

            {morningAppointments.length === 0 && <p>Nenhum agendamento neste período</p>}

            {morningAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock /> {appointment.hourFormatted}
                </span>
                <div>
                  <img src={appointment.user.avatar_url} alt={appointment.user.name} />
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>

          <Section>
            <strong>Tarde</strong>
            {afternoonAppointments.length === 0 && <p>Nenhum agendamento neste período</p>}

            {afternoonAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock /> {appointment.hourFormatted}
                </span>
                <div>
                  <img src={appointment.user.avatar_url} alt={appointment.user.name} />
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
        </Schedule>

        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            months={['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;

// useCallback = EXECUTAR uma função dentro de outra função, quando uma variável mudar
// useEffect = DISPARAR uma função, quando uma variável mudar
// useMemo = RETORNAR um valor (uma formatação de variáveis ou algum cálculo), quando uma variável mudar
