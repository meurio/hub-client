import styled from '@emotion/styled';

const ThemeStyles = styled.div`
  // MEU RIO
  .meurio-scheme {
    .widget {
      color: #444;

      a {
        color: #119146;
      }
      .button {
        color: white;
      }
    }

    .bg-1 {
      background-color: #039046;
    }
    .bg-2 {
      background-color: #2bbae2;
    }
    .bg-3 {
      background-color: #ffcf01;
    }
    .bg-4 {
      background-color: #ef7f3a;
    }
    .bg-5 {
      background-color: #ed1c24;
    }
    .bg-6 {
      background-color: #df499a;
    }
    .bg-7 {
      background-color: #8c78b7;
    }
    .bg-8 {
      background-color: #353a3d;
    }

    .bg-1,
    .bg-2,
    .bg-3,
    .bg-4,
    .bg-5,
    .bg-6,
    .bg-7,
    .bg-8 {
      .widget {
        color: white;
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          color: white;
        }
      }
    }
  }

  // MINHA PORTA ALEGRE
  .minhaportoalegre-scheme {
    .widget {
      color: #444;

      .button {
        color: white;
      }
    }

    .bg-1 {
      background-color: #f68b1f;
    }
    .bg-2 {
      background-color: #f15622;
    }
    .bg-3 {
      background-color: #1a9cac;
    }
    .bg-1,
    .bg-2,
    .bg-3,
    .bg-4,
    .bg-5,
    .bg-6,
    .bg-7,
    .bg-8 {
      .widget {
        color: white;
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          color: white;
        }
      }
    }
  }
`;

export default ThemeStyles;
