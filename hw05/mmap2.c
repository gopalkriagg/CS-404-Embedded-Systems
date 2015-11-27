//Modified by Gopal Krishan Aggarwal on 22 Novemeber, 2015
#include <sys/mman.h>
#include <fcntl.h>
#include <stdio.h>

#define GPIO0_START_ADDR 0x44E07000
#define GPIO0_END_ADDR   0x44E09000
#define GPIO0_SIZE (GPIO0_END_ADDR - GPIO0_START_ADDR)

#define GPIO1_START_ADDR 0x4804C000
#define GPIO1_END_ADDR   0x4804E000
#define GPIO1_SIZE (GPIO1_END_ADDR - GPIO1_START_ADDR)

#define GPIO_SETDATAOUT 0x194
#define GPIO_CLEARDATAOUT 0x190
#define GPIO_DATAIN 0x138

#define P8_12 (1<<12)
#define P9_12 (1<<28)
#define LED1 P8_12
#define LED2 P9_12

#define P8_16 (1<<14)
#define P8_15 (1<<15)
#define SWITCH1 P8_15
#define SWITCH2 P8_16

int main(int argc, char * argv[])
{
/*    //Following variables are declared for gpio0
    volatile void *gpio0_addr;
    volatile unsigned int *gpio0_setdataout_addr;
    volatile unsigned int *gpio0_cleardataout_addr;
*/    
    //Following variables are declared for gpio1    
    volatile void *gpio1_addr;
    volatile unsigned int *gpio1_setdataout_addr;
    volatile unsigned int *gpio1_cleardataout_addr;
    volatile unsigned int *gpio1_datain_addr;
    int fd = open("/dev/mem", O_RDWR);
    
/*    //Following three lines are trying to get start address for gpio0_addr and then get address for setdataout and cleardataout
    gpio0_addr = mmap(0, GPIO0_SIZE, PROT_READ | PROT_WRITE, MAP_SHARED, fd, GPIO0_START_ADDR);
    gpio0_setdataout_addr = gpio0_addr + GPIO_SETDATAOUT;
    gpio0_cleardataout_addr = gpio0_addr + GPIO_CLEARDATAOUT;
*/
    //Following three lines are trying to get start address for gpio1_addr and then get address for setdataout and cleardataout
    gpio1_addr = mmap(0, GPIO1_SIZE, PROT_READ | PROT_WRITE, MAP_SHARED, fd, GPIO1_START_ADDR);
    gpio1_setdataout_addr = gpio1_addr + GPIO_SETDATAOUT;
    gpio1_cleardataout_addr = gpio1_addr + GPIO_CLEARDATAOUT;
    gpio1_datain_addr = gpio1_addr + GPIO_DATAIN;
    while(1) {
        if(*gpio1_datain_addr & SWITCH1) {
            *gpio1_setdataout_addr = LED1;
        }
        else {
            *gpio1_cleardataout_addr = LED1;
        }
       if(*gpio1_datain_addr & SWITCH2) {
            *gpio1_setdataout_addr = LED2;
        }
        else {
            *gpio1_cleardataout_addr = LED2;
        }
    }
 
    printf("Data at data in %p: \n", *gpio1_datain_addr);
    return 0;
}